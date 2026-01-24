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
    <div className={`bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      <div className="floating-orb orb-pink w-40 h-40 top-1/3 right-1/4" style={{animationDelay: '12s'}} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8">
          <h1 className="text-3xl font-bold text-[#FF007F] mb-8 text-center">
            お問い合わせ
          </h1>

          <div className="space-y-8">
            <section className="text-center">
              <p className="text-gray-300 mb-6 text-lg">
                ご質問やご意見、ご感想をお気軽にお寄せください。<br/>
                あなたからのメッセージを楽しみにしております。
              </p>
              
              <div className="bg-[#1A1A1A] border border-[#00FFFF] rounded-lg p-8 mt-8">
                <h2 className="text-xl font-bold text-[#00FFFF] mb-4">お問い合わせメール</h2>
                <a 
                  href="mailto:nighttype.contact@gmail.com"
                  className="text-[#FF007F] text-lg font-bold hover:text-[#FF66B3] transition-colors"
                >
                  nighttype.contact@gmail.com
                </a>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/"
                  className="luxury-button text-white px-8 py-3 rounded-full font-bold inline-block transition-all duration-300 hover:scale-105"
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