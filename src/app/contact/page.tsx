import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'お問い合わせ | ダイエットキャラ診断',
  description: 'ダイエットキャラ診断へのお問い合わせ先について',
}

export default function ContactPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            お問い合わせ
          </h1>

          <div className="space-y-8">
            <section className="text-center">
              <p className="text-gray-600 mb-6">
                ダイエットキャラ診断に関するご質問・ご意見・ご要望は、
                以下の方法でお気軽にお問い合わせください。
              </p>
            </section>

            {/* SNSでのお問い合わせ */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">SNSでのお問い合わせ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* X (Twitter) */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-2xl mb-3">🐦</div>
                  <h3 className="font-bold text-lg mb-2">X (Twitter)</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    DMまたはメンションでお気軽にお声がけください
                  </p>
                  <a 
                    href="https://x.com/lovechara64" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    @lovechara64
                  </a>
                </div>

                {/* Instagram */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-2xl mb-3">📷</div>
                  <h3 className="font-bold text-lg mb-2">Instagram</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    DMでお気軽にお問い合わせください
                  </p>
                  <a 
                    href="https://instagram.com/lovechara64"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                  >
                    @lovechara64
                  </a>
                </div>
              </div>
            </section>

            {/* LINE公式アカウント */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">LINE公式アカウント</h2>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-bold text-lg mb-2">LINE公式アカウント</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  最も迅速にお答えできます
                </p>
                <a 
                  href="https://lin.ee/BCYVfcD"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  友だち追加してメッセージ
                </a>
              </div>
            </section>

            {/* お問い合わせ内容について */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">お問い合わせ内容について</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li>• 診断結果に関するご質問</li>
                  <li>• サービス機能に関するお問い合わせ</li>
                  <li>• 技術的な問題の報告</li>
                  <li>• サービス改善のご提案</li>
                  <li>• メディア・取材に関するお問い合わせ</li>
                  <li>• その他ご意見・ご感想</li>
                </ul>
              </div>
            </section>

            {/* 監修者情報 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">監修者について</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">一般社団法人 日本恋愛学協会</h3>
                  <p className="text-gray-600 mb-2">代表理事 牧野医師</p>
                  <p className="text-gray-500 text-sm">（東京大学医学部卒/精神科医）</p>
                </div>
              </div>
            </section>

            {/* 返信について */}
            <section className="text-center">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">
                  ※ お問い合わせの内容によっては、返信までお時間をいただく場合がございます。<br/>
                  ※ 営業・宣伝目的のお問い合わせはご遠慮ください。
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}