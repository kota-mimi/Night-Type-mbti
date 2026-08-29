import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { test } from 'node:test'
import { characterSlugs } from '../src/data/characterSlugs.ts'
import { chibiCharacterArt } from '../src/data/chibiCharacters.ts'
import { genderedDiagramTypes } from '../src/data/diagramTypes.ts'

const genders = ['male', 'female']
const normalizeName = (name) => name.replace(/（[^）]+）/g, '')

test('all 32 characters share the same code and display name across data sources', () => {
  const characterKeys = Object.keys(characterSlugs)
  assert.equal(characterKeys.length, 32)
  assert.equal(new Set(Object.values(characterSlugs)).size, 32, 'character slugs must be unique')

  for (const gender of genders) {
    const diagramCodes = Object.keys(genderedDiagramTypes[gender]).sort()
    const artCodes = Object.keys(chibiCharacterArt[gender]).sort()
    assert.equal(diagramCodes.length, 16)
    assert.deepEqual(artCodes, diagramCodes)

    for (const typeCode of diagramCodes) {
      const key = `${typeCode}-${gender}`
      assert.ok(characterSlugs[key], `${key} must have a detail-page slug`)
      assert.equal(
        chibiCharacterArt[gender][typeCode].name,
        normalizeName(genderedDiagramTypes[gender][typeCode].name),
        `${key} must use the same character name everywhere`,
      )
    }
  }
})

test('all 32 gallery character images exist', async () => {
  for (const characterKey of Object.keys(characterSlugs)) {
    const [typeCode, gender] = characterKey.split('-')
    await access(`public/characters/chibi/${typeCode}_${gender}.png`)
  }
})
