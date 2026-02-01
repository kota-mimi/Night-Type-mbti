import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'プライバシーポリシー | Night Type',
  description: 'Night Typeのプライバシーポリシー・個人情報の取り扱いについて',
}

export default function PrivacyPage() {
  return (
    <div className={`min-h-screen bg-[#111111] ${notoSansJP.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8">
          <h1 className="text-xl md:text-2xl font-bold text-[#FFFFFF] mb-6 text-center">
            プライバシーポリシー
          </h1>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
            
            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">個人情報の取り扱いについて</h2>
              <p className="mb-3">
                Night Type（以下「当サービス」）では、ユーザーのプライバシーを尊重し、
                個人情報の保護に努めております。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">年齢制限について</h2>
              <p className="mb-3">
                当サービスは18歳以上の方を対象としており、アダルト向けコンテンツを含みます。
                18歳未満の方のご利用はお控えください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">収集する情報</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>診断結果に関する情報</li>
                <li>アクセス解析のためのGoogle Analytics情報</li>
                <li>サービス利用状況に関する統計情報</li>
                <li>アフィリエイトリンクのクリック情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">情報の利用目的</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>サービスの提供・運営</li>
                <li>サービスの改善・開発</li>
                <li>ユーザーサポート</li>
                <li>統計データの作成</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">第三者への提供</h2>
              <p>
                個人情報は、法令に基づく場合を除き、第三者に提供することはありません。
                ただし、統計情報として個人を特定できない形での情報は、
                サービス改善のために利用する場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">アフィリエイトプログラムについて</h2>
              <p className="mb-3">
                当サービスは、以下のアフィリエイトプログラムに参加しており、
                商品紹介によって紹介料を得る場合があります：
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li><strong>Amazonアソシエイト・プログラム：</strong> 
                当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</li>
                <li><strong>DMMアフィリエイトプログラム：</strong> 
                DMMの商品・サービスを紹介することにより、紹介料を得る場合があります。</li>
              </ul>
              <p className="text-sm text-gray-400">
                これらのリンクを通じて商品を購入された場合、当サービスに紹介料が支払われることがありますが、
                購入者様に追加の費用が発生することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">外部サービスについて</h2>
              <p className="mb-3">
                当サービスは、Amazon・DMM等の外部サービスへのリンクを含みます。
                これらの外部サービスのプライバシーポリシーについては、
                各サービスの規約をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">Cookie（クッキー）について</h2>
              <p className="mb-3">
                当サービスでは、Google Analyticsを使用してアクセス解析を行っています。
                また、アフィリエイトプログラムの成果測定のためにCookieを使用する場合があります。
                Cookieを無効にしても当サービスをご利用いただけますが、
                一部機能が制限される場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">プライバシーポリシーの変更</h2>
              <p>
                本プライバシーポリシーは、必要に応じて変更する場合があります。
                変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2 text-gray-200">お問い合わせ</h2>
              <p className="mb-3">
                プライバシーポリシーに関するお問い合わせは、以下からお願いいたします。
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p><strong>メール：</strong> <a href="mailto:nighttype.contact@gmail.com" className="text-blue-600 hover:underline">nighttype.contact@gmail.com</a></p>
                <p><strong>お問い合わせ：</strong> 
                  <a href="/contact" className="text-blue-600 hover:underline ml-1">こちら</a>
                </p>
              </div>
            </section>

            <div className="text-right text-xs text-gray-500 mt-6">
              制定日：2026年1月12日
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}