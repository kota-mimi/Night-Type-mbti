import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { characterSlugs } from '../src/data/characterSlugs.ts'

test('every character has a PNG sticker with an alpha channel', async () => {
  assert.equal(Object.keys(characterSlugs).length, 32)

  for (const characterKey of Object.keys(characterSlugs)) {
    const [typeCode, gender] = characterKey.split('-')
    const image = await readFile(`public/characters/stickers/${typeCode}_${gender}.png`)
    const pngColorType = image[25]
    assert.ok(
      pngColorType === 4 || pngColorType === 6,
      `${characterKey} must use a PNG color type with alpha`,
    )
  }
})
