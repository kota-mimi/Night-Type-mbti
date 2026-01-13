'use client'

import { motion } from 'framer-motion'
import { Noto_Sans_JP } from 'next/font/google'
import { User, Brain, Scale, Clock } from 'lucide-react'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export default function AboutPage() {
  const axes = [
    {
      icon: <User className="w-8 h-8 text-blue-600" />,
      title: '第1指標：環境 (Environment)',
      subtitle: '「孤独を愛するか、共感を求めるか」',
      items: [
        {
          type: 'S：ソロ (Solo)',
          feature: '特徴：誰にも見られず、自分のペースで黙々と進めたい「秘密主義」タイプ。',
          psychology: '心理：他人の干渉や監視がストレスになります。結果が出てから事後報告したい派。'
        },
        {
          type: 'G：グループ (Group)',
          feature: '特徴：仲間と励まし合ったり、SNSで宣言することで力を発揮する「社交」タイプ。',
          psychology: '心理：一人だとサボりがちですが、誰かの目があると「やらなきゃ」という責任感が生まれます。'
        }
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: '第2指標：行動原理 (Action)',
      subtitle: '「規律を守るか、直感に従うか」',
      items: [
        {
          type: 'R：ルーティン (Routine)',
          feature: '特徴：決まったメニューや時間を守ることに快感を覚える「計画」タイプ。',
          psychology: '心理：予定通りに進むと安心します。急な飲み会などのイレギュラーな予定が大敵。'
        },
        {
          type: 'E：エモーション (Emotion)',
          feature: '特徴：その日の気分や体調に合わせて柔軟に変えたい「感覚」タイプ。',
          psychology: '心理：「飽き」が一番の敵。楽しさやワクワク感がないと、どんなに効果があっても続きません。'
        }
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: '第3指標：判断基準 (Judgment)',
      subtitle: '「質を重視するか、数字を管理するか」',
      items: [
        {
          type: 'F：フード＆クオリティ (Food Quality)',
          feature: '特徴：カロリーの数字よりも「素材の質」や「見た目」を重視するタイプ。',
          psychology: '心理：添加物や加工食品を嫌います。数字管理は苦手ですが、「体に良いこと」なら続きます。'
        },
        {
          type: 'C：カリキュレーション (Calculation)',
          feature: '特徴：P（タンパク質）F（脂質）C（炭水化物）の数字を支配したいタイプ。',
          psychology: '心理：1kcal単位の誤差も許しません。成分表示を見ること自体が趣味になりがちです。'
        }
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: '第4指標：時間軸 (Timeline)',
      subtitle: '「短期集中か、習慣化か」',
      items: [
        {
          type: 'Q：クイック (Quick)',
          feature: '特徴：「夏まで」などの明確な期限を決めて、短期間で結果を出したいタイプ。',
          psychology: '心理：変化が見えないとすぐ冷めます。瞬発力はありますが、ダラダラ続けるのが苦手です。'
        },
        {
          type: 'L：ロング (Long)',
          feature: '特徴：一生続けられる習慣として、ゆるく長く続けたいタイプ。',
          psychology: '心理：劇的な変化は求めません。「リバウンドしないこと」を最優先に考えます。'
        }
      ]
    }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* 4つの軸 */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              ダイエットMBTIの4つの分析軸
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                なぜ、あの人のダイエット成功法が、あなたには効かないのでしょうか？
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                それは「意志の強さ」の違いではなく、<strong className="text-green-600">「脳のクセ（性格）」の違い</strong>です。
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                本診断では、あなたの行動パターンを4つの指標で分析。全16タイプの中から、あなたが最もストレスなく痩せられる「正解」を導き出します。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {axes.map((axis, index) => (
              <div key={index} className="bg-[#E6F3FF] rounded-xl p-4 md:p-6">
                {/* 軸のタイトル */}
                <div className="mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {axis.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {axis.subtitle}
                  </p>
                </div>

                {/* 2つのタイプ */}
                <div className="grid md:grid-cols-2 gap-4">
                  {axis.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white rounded-xl p-4 space-y-3"
                    >
                      <h3 className="text-base font-bold text-gray-800">
                        {item.type}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.feature}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.psychology}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}