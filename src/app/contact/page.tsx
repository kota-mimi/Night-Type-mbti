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
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
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
                  href="mailto:nighttype.contact@gmail.com"
                  className="text-teal-600 text-lg font-bold hover:text-teal-700 transition-colors"
                >
                  nighttype.contact@gmail.com
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



          </div>
        </div>
      </div>
    </div>
  )
}