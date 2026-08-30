/**
 * 纯 Node.js 实现的 MP4 faststart 重封装
 *
 * 把 moov 元数据 box 移到 mdat 之前，并修正 stco/co64 分块偏移，
 * 让浏览器能"边下边播"，无需下载完整个文件。
 * 流式复制（不重编码），质量无损。用法：
 *   node scripts/faststart.mjs <input.mp4>          # 原地重写
 *   node scripts/faststart.mjs <input.mp4> <output> # 写到新文件
 */
import { readFileSync, writeFileSync } from 'node:fs'

function readBoxes(buf, start, end) {
  const boxes = []
  let off = start
  while (off + 8 <= end) {
    const size = buf.readUInt32BE(off)
    const type = buf.toString('ascii', off + 4, off + 8)
    if (size < 8 || off + size > end) break
    boxes.push({ type, size, off })
    off += size
  }
  return boxes
}

// 在一个 box 的 payload 里定位指定四字符码的 box（逐字节扫，四字符码唯一性足够可靠）
function findSubBoxes(buf, code) {
  const found = []
  const needle = Buffer.from(code, 'ascii')
  let idx = 0
  while ((idx = buf.indexOf(needle, idx)) !== -1) {
    if (idx >= 4) {
      const size = buf.readUInt32BE(idx - 4)
      if (size >= 16 && idx - 4 + size <= buf.length) found.push({ size, off: idx - 4 })
    }
    idx += 1
  }
  return found
}

const [input, output] = process.argv.slice(2)
if (!input) {
  console.error('用法: node scripts/faststart.mjs <input.mp4> [output.mp4]')
  process.exit(1)
}

const buf = readFileSync(input)
const boxes = readBoxes(buf, 0, buf.length)
const ftyp = boxes.find((b) => b.type === 'ftyp')
const free = boxes.find((b) => b.type === 'free')
const moov = boxes.find((b) => b.type === 'moov')
const mdat = boxes.find((b) => b.type === 'mdat')

if (!moov || !mdat || !ftyp) {
  console.error(`❌ ${input}: 未找到 ftyp/moov/mdat，不是有效的 MP4`)
  process.exit(1)
}
if (moov.off < mdat.off) {
  console.log(`✓ ${input}: 已是 faststart 布局，无需处理`)
  process.exit(0)
}

const newMdatOff = ftyp.size + (free ? free.size : 0) + moov.size
const delta = newMdatOff - mdat.off
console.log(`- moov: ${moov.off} → ${ftyp.size + (free ? free.size : 0)}（前移）`)
console.log(`- mdat: ${mdat.off} → ${newMdatOff}（delta ${delta}）`)

// 复制 moov 并修正内部 chunk offsets
const newMoov = Buffer.from(buf.subarray(moov.off, moov.off + moov.size))
const stcoList = findSubBoxes(newMoov, 'stco')
const co64List = findSubBoxes(newMoov, 'co64')
console.log(`- 修正 chunk offset: stco×${stcoList.length} co64×${co64List.length}`)

for (const { off } of stcoList) {
  const count = newMoov.readUInt32BE(off + 12)
  for (let i = 0; i < count; i++) {
    const p = off + 16 + i * 4
    newMoov.writeUInt32BE(newMoov.readUInt32BE(p) + delta, p)
  }
}
for (const { off } of co64List) {
  const count = newMoov.readUInt32BE(off + 12)
  for (let i = 0; i < count; i++) {
    const p = off + 16 + i * 8
    newMoov.writeBigUInt64BE(newMoov.readBigUInt64BE(p) + BigInt(delta), p)
  }
}

// 重排: ftyp + (free) + moov + mdat
const out = Buffer.alloc(ftyp.size + (free ? free.size : 0) + moov.size + mdat.size)
let off = 0
buf.copy(out, off, ftyp.off, ftyp.off + ftyp.size); off += ftyp.size
if (free) { buf.copy(out, off, free.off, free.off + free.size); off += free.size }
newMoov.copy(out, off); off += moov.size
buf.copy(out, off, mdat.off, mdat.off + mdat.size)

const target = output || input
writeFileSync(target, out)
console.log(`✓ 已写出 ${target} (${out.length} bytes)`)
