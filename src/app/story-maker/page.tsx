'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, ImagePlus, Move, Share2 } from 'lucide-react'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { trackEvent } from '@/lib/analyticsEvents'

type Gender = 'male' | 'female'
type Position = { x: number; y: number }

const OUTPUT_WIDTH = 1080
const OUTPUT_HEIGHT = 1920

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = source
  })
}

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement) {
  const scale = Math.max(OUTPUT_WIDTH / image.naturalWidth, OUTPUT_HEIGHT / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  context.drawImage(image, (OUTPUT_WIDTH - width) / 2, (OUTPUT_HEIGHT - height) / 2, width, height)
}

export default function StoryMakerPage() {
  const router = useRouter()
  const previewRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef<Position>({ x: 0, y: 0 })
  const [typeCode, setTypeCode] = useState('')
  const [gender, setGender] = useState<Gender>('male')
  const [photoUrl, setPhotoUrl] = useState('')
  const [position, setPosition] = useState<Position>({ x: 0.66, y: 0.7 })
  const [stickerSize, setStickerSize] = useState(52)
  const [showLabel, setShowLabel] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const answers = localStorage.getItem('diet-quiz-answers')
    const savedGender = localStorage.getItem('user-gender')
    if (!answers || (savedGender !== 'male' && savedGender !== 'female')) {
      router.replace('/')
      return
    }

    import('@/lib/scoring').then(({ getTypeFromAnswers, areAnswersValid }) => {
      try {
        const parsed = JSON.parse(answers)
        if (!Array.isArray(parsed) || !areAnswersValid(parsed)) {
          router.replace('/')
          return
        }
        setTypeCode(getTypeFromAnswers(parsed))
        setGender(savedGender)
        trackEvent('story_maker_open')
      } catch {
        router.replace('/')
      }
    })
  }, [router])

  useEffect(() => () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
  }, [photoUrl])

  const character = typeCode ? genderedDiagramTypes[gender][typeCode] : null
  const stickerPath = typeCode ? `/characters/stickers/${typeCode}_${gender}.png` : ''

  const handlePhoto = (file?: File) => {
    if (!file) return
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(URL.createObjectURL(file))
    trackEvent('story_photo_select', { type: typeCode })
  }

  const moveSticker = (clientX: number, clientY: number) => {
    const preview = previewRef.current
    if (!preview) return
    const rect = preview.getBoundingClientRect()
    setPosition({
      x: Math.min(1, Math.max(0, (clientX - rect.left - dragOffset.current.x) / rect.width)),
      y: Math.min(1, Math.max(0, (clientY - rect.top - dragOffset.current.y) / rect.height)),
    })
  }

  const createStoryBlob = async () => {
    if (!photoUrl || !stickerPath || !character) throw new Error('画像が足りません')
    const [photo, sticker] = await Promise.all([loadImage(photoUrl), loadImage(stickerPath)])
    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_WIDTH
    canvas.height = OUTPUT_HEIGHT
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvasを初期化できません')

    drawCover(context, photo)
    const width = OUTPUT_WIDTH * (stickerSize / 100)
    const height = width * (sticker.naturalHeight / sticker.naturalWidth)
    const x = position.x * OUTPUT_WIDTH - width / 2
    const y = position.y * OUTPUT_HEIGHT - height / 2
    context.drawImage(sticker, x, y, width, height)

    if (showLabel) {
      context.textAlign = 'center'
      context.font = '900 42px sans-serif'
      context.fillStyle = 'rgba(23, 21, 43, 0.88)'
      const labelWidth = Math.min(780, context.measureText(character.name).width + 260)
      context.beginPath()
      context.roundRect((OUTPUT_WIDTH - labelWidth) / 2, 1715, labelWidth, 160, 64)
      context.fill()
      context.fillStyle = '#fff8ee'
      context.fillText(`${character.name} · ${typeCode}`, OUTPUT_WIDTH / 2, 1785)
      context.font = '700 24px sans-serif'
      context.fillText('Night Type  |  www.night-type.net', OUTPUT_WIDTH / 2, 1840)
    }

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('画像を作成できません')), 'image/png')
    })
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = async (share: boolean) => {
    if (!photoUrl) return
    setIsExporting(true)
    try {
      const blob = await createStoryBlob()
      const file = new File([blob], `night-type-${typeCode}-story.png`, { type: 'image/png' })
      if (share && navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ files: [file], title: `Night Type ${character?.name}` })
        trackEvent('story_share', { type: typeCode, gender })
      } else {
        downloadBlob(blob, file.name)
        trackEvent('story_download', { type: typeCode, gender })
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error(error)
        alert('画像の作成に失敗しました。')
      }
    } finally {
      setIsExporting(false)
    }
  }

  if (!typeCode || !character) return null

  return (
    <main className="min-h-screen bg-[#fff8ee] px-4 py-6 text-[#211b18]">
      <div className="mx-auto max-w-lg">
        <button type="button" onClick={() => router.back()} className="mb-5 inline-flex items-center gap-2 text-sm font-black">
          <ArrowLeft className="h-5 w-5" /> 結果に戻る
        </button>
        <header className="mb-6 text-center">
          <p className="text-xs font-black tracking-[0.2em] text-[#e4557f]">STORY MAKER</p>
          <h1 className="mt-2 text-3xl font-black">写真にキャラを貼ってシェア</h1>
          <p className="mt-2 text-sm font-bold text-[#786a62]">Instagramストーリー用の1080×1920pxで保存します。</p>
        </header>

        <div
          ref={previewRef}
          className="relative mx-auto aspect-[9/16] w-full max-w-[360px] touch-none overflow-hidden rounded-[28px] border-2 border-[#211b18] bg-[#352b52] shadow-[5px_5px_0_#211b18]"
          style={photoUrl ? { backgroundImage: `url(${photoUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' } : undefined}
        >
          {!photoUrl && (
            <label className="absolute inset-0 grid cursor-pointer place-items-center p-8 text-center text-white">
              <span><ImagePlus className="mx-auto mb-3 h-10 w-10" /><strong className="block">背景にする写真を選ぶ</strong><small className="mt-2 block text-[#c9c1dc]">写真はサーバーに送信されません</small></span>
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhoto(event.target.files?.[0])} />
            </label>
          )}

          <div
            className={`absolute cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
            style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%`, width: `${stickerSize}%`, aspectRatio: '1', transform: 'translate(-50%, -50%)' }}
            onPointerDown={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              dragOffset.current = { x: event.clientX - (rect.left + rect.width / 2), y: event.clientY - (rect.top + rect.height / 2) }
              event.currentTarget.setPointerCapture(event.pointerId)
              setIsDragging(true)
            }}
            onPointerMove={(event) => { if (isDragging) moveSticker(event.clientX, event.clientY) }}
            onPointerUp={() => setIsDragging(false)}
            onPointerCancel={() => setIsDragging(false)}
          >
            <Image src={stickerPath} alt={character.name} fill sizes="360px" className="pointer-events-none object-contain" priority unoptimized />
          </div>

          {showLabel && (
            <div className="absolute inset-x-4 bottom-4 rounded-full bg-[#17152b]/90 px-4 py-2 text-center text-white">
              <p className="text-sm font-black">{character.name} · {typeCode}</p>
              <p className="text-[9px] font-bold text-[#d8d0e8]">Night Type | www.night-type.net</p>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-5 rounded-[24px] border-2 border-[#211b18] bg-white p-5 shadow-[4px_4px_0_#211b18]">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-black"><Move className="h-4 w-4" />キャラの大きさ</span>
            <input type="range" min="28" max="82" value={stickerSize} onChange={(event) => setStickerSize(Number(event.target.value))} className="w-full accent-[#ff6f91]" />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm font-black">
            タイプ名とURLを入れる
            <input type="checkbox" checked={showLabel} onChange={(event) => setShowLabel(event.target.checked)} className="h-5 w-5 accent-[#ff6f91]" />
          </label>
          {photoUrl && (
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#211b18] bg-[#fff8ee] px-5 py-3 text-sm font-black">
              <ImagePlus className="h-5 w-5" />写真を変更
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhoto(event.target.files?.[0])} />
            </label>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" disabled={!photoUrl || isExporting} onClick={() => handleExport(false)} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#211b18] bg-white px-4 py-4 font-black shadow-[3px_3px_0_#211b18] disabled:opacity-40">
            <Download className="h-5 w-5" />保存
          </button>
          <button type="button" disabled={!photoUrl || isExporting} onClick={() => handleExport(true)} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-4 py-4 font-black text-white shadow-[3px_3px_0_#211b18] disabled:opacity-40">
            <Share2 className="h-5 w-5" />シェア
          </button>
        </div>
        <a href={stickerPath} download={`${typeCode}-${gender}-sticker.png`} onClick={() => trackEvent('sticker_download', { type: typeCode, gender })} className="mt-5 block text-center text-sm font-black underline decoration-2 underline-offset-4">
          透過キャラだけを保存
        </a>
      </div>
    </main>
  )
}
