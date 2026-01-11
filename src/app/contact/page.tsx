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
              <p className="text-gray-600 mb-6 text-lg">
                ご質問やご意見、ご感想をお気軽にお寄せください。<br/>
                あなたからのメッセージを楽しみにしております。
              </p>
              
              <div className="bg-teal-50 p-8 rounded-lg border border-teal-200 mt-8">
                <h2 className="text-xl font-bold text-teal-800 mb-4">お問い合わせメール</h2>
                <a 
                  href="mailto:support@example.com"
                  className="text-teal-600 text-lg font-bold hover:text-teal-700 transition-colors"
                >
                  support@example.com
                </a>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/"
                  className="inline-block bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors font-bold"
                >
                  ホームに戻る
                </a>
              </div>
            </section>

            {/* 広告セクション */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">おすすめサービス</h2>
              <div className="bg-green-50 p-6 rounded-lg text-center border-2 border-green-200">
                <div className="text-2xl mb-3">🥗</div>
                <h3 className="font-bold text-lg mb-2 text-green-800">食事管理LINE公式アカウント</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  診断結果に合わせた食事管理で理想の体型を目指しませんか？<br/>
                  プロの栄養士があなたをサポートします
                </p>
                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <p>✓ 個別食事プラン作成</p>
                  <p>✓ 24時間サポート</p>
                  <p>✓ 進捗管理・アドバイス</p>
                </div>
                <a 
                  href="https://lin.ee/BCYVfcD"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-bold shadow-lg"
                >
                  今すぐ始める（無料相談）
                </a>
              </div>
            </section>


          </div>
        </div>
      </div>
    </div>
  )
}