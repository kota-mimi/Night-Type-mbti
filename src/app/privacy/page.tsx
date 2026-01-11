import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'プライバシーポリシー | ダイエット診断16',
  description: 'ダイエット診断16のプライバシーポリシー・個人情報の取り扱いについて',
}

export default function PrivacyPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            プライバシーポリシー
          </h1>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">個人情報の取り扱いについて</h2>
              <p className="mb-4">
                ダイエット診断16（以下「当サービス」）では、ユーザーのプライバシーを尊重し、
                個人情報の保護に努めております。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">収集する情報</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>診断結果に関する情報</li>
                <li>アクセス解析のためのGoogle Analytics情報</li>
                <li>サービス利用状況に関する統計情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">情報の利用目的</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>サービスの提供・運営</li>
                <li>サービスの改善・開発</li>
                <li>ユーザーサポート</li>
                <li>統計データの作成</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">第三者への提供</h2>
              <p>
                個人情報は、法令に基づく場合を除き、第三者に提供することはありません。
                ただし、統計情報として個人を特定できない形での情報は、
                サービス改善のために利用する場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Cookie（クッキー）について</h2>
              <p className="mb-4">
                当サービスでは、Google Analyticsを使用してアクセス解析を行っています。
                Cookieを無効にしても当サービスをご利用いただけますが、
                一部機能が制限される場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">プライバシーポリシーの変更</h2>
              <p>
                本プライバシーポリシーは、必要に応じて変更する場合があります。
                変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-800">お問い合わせ</h2>
              <p className="mb-4">
                プライバシーポリシーに関するお問い合わせは、以下からお願いいたします。
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p><strong>メール：</strong> support@diet-diagnosis16.com</p>
                <p><strong>お問い合わせ：</strong> 
                  <a href="/contact" className="text-blue-600 hover:underline ml-1">こちら</a>
                </p>
              </div>
            </section>

            <div className="text-right text-sm text-gray-500 mt-8">
              制定日：2026年1月12日
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}