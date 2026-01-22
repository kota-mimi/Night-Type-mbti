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
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-64 h-64 top-20 left-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-48 h-48 top-1/2 right-20" style={{animationDelay: '4s'}} />
      <div className="floating-orb orb-purple w-56 h-56 bottom-20 left-1/3" style={{animationDelay: '8s'}} />
      <div className="floating-orb orb-pink w-40 h-40 top-1/3 right-1/4" style={{animationDelay: '12s'}} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="dark-card p-8">
          <h1 className="text-3xl font-bold neon-gold mb-8 text-center">
            お問い合わせ
          </h1>

          <div className="space-y-8">
            <section className="text-center">
              <p className="text-gray-300 mb-6 text-lg">
                ご質問やご意見、ご感想をお気軽にお寄せください。<br/>
                あなたからのメッセージを楽しみにしております。
              </p>
              
              <div className="dark-card border border-neon-cyan-500/30 p-8 mt-8">
                <h2 className="text-xl font-bold neon-cyan mb-4">お問い合わせメール</h2>
                <a 
                  href="mailto:nighttype.contact@gmail.com"
                  className="neon-pink text-lg font-bold hover:text-pink-300 transition-colors"
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