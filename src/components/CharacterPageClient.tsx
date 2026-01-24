'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, ArrowRight } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { diagramTypes } from '@/data/diagramTypes'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})


interface Props {
  slug: string
  typeCode: string
  character: any
}

export default function CharacterPageClient({ slug, typeCode, character }: Props) {
  // カードの背景色とテキスト色を決定
  let cardBgColor = 'bg-blue-200/50'
  let textColor = 'text-blue-600'
  let accentColor = 'blue'
  
  if (typeCode.startsWith('SR')) {
    cardBgColor = 'bg-green-200/50'
    textColor = 'text-green-600'
    accentColor = 'green'
  } else if (typeCode.startsWith('SE')) {
    cardBgColor = 'bg-purple-200/50'
    textColor = 'text-purple-600'
    accentColor = 'purple'
  } else if (typeCode.startsWith('GR')) {
    cardBgColor = 'bg-red-400/60'
    textColor = 'text-red-600'
    accentColor = 'red'
  } else if (typeCode.startsWith('GE')) {
    cardBgColor = 'bg-blue-200/50'
    textColor = 'text-blue-600'
    accentColor = 'blue'
  }

  return (
    <div className={`min-h-screen bg-[#111111] ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* パンくずナビ */}
        <motion.nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ArrowRight className="w-4 h-4" />
            <Link href="/gallery" className="hover:text-white transition-colors">キャラクター一覧</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white font-medium">{character.name}</span>
          </div>
        </motion.nav>

        {/* メインコンテンツ - シンプルなカードデザイン */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className={`${cardBgColor} rounded-lg p-6 border border-[#333333]`}>
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333333] text-center">
              {/* タイプコード */}
              <div className="mb-4">
                <span className={`text-lg font-bold ${textColor} bg-gray-100 px-3 py-1 rounded-full`}>
                  {typeCode}
                </span>
              </div>

              {/* キャラクター画像 */}
              <div className="flex justify-center mb-6">
                <Image
                  src={`/characters/${typeCode === 'SRFQ' ? 'SRFQ_gallery.png' : typeCode === 'SECQ' ? 'SECQ_gallery.png' : typeCode === 'SEFL' ? 'SEFL_gallery.png' : typeCode === 'SRCL' ? 'SRCL_gallery.png' : typeCode === 'GEFQ' ? 'GEFQ_gallery.png' : typeCode === 'SRFL' ? 'SRFL_gallery.png' : typeCode === 'GRCQ' ? 'GRCQ_gallery.png' : typeCode === 'GEFL' ? 'GEFL_gallery.png' : typeCode === 'GECL' ? 'GECL_gallery.png' : typeCode === 'GECQ' ? 'GECQ_gallery.png' : typeCode === 'SRCQ' ? 'SRCQ_gallery.png' : typeCode === 'SEFQ' ? 'SEFQ_gallery.png' : typeCode === 'GRCL' ? 'GRCL_gallery.png' : typeCode === 'GRFQ' ? 'GRFQ_gallery.png' : typeCode === 'SECL' ? 'SECL_gallery.png' : typeCode === 'GRFL' ? 'GRFL_gallery.png' : typeCode + '_new3.png'}`}
                  alt={`${character.name}のキャラクター`}
                  width={200}
                  height={225}
                  className="w-48 h-auto"
                  quality={95}
                />
              </div>

              {/* キャラクター名とキャッチコピー */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-2">
                  {character.name}
                </h1>
                <p className={`text-lg ${textColor} font-medium`}>
                  {character.catchcopy}
                </p>
              </div>

              {/* 基本生態 */}
              <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">基本生態</h3>
                <p className="text-gray-700 leading-relaxed">
                  {character.basicEcology}
                </p>
              </div>

              {/* 夜の生態レポート */}
              <div className="bg-red-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-red-700 mb-3 text-center">夜の生態レポート</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {typeCode === 'ESTJ' ? 
                    `あなたは、セックスを「自分が満足するための儀式」と捉えている、生粋の女王様です。 ベッドの上での主導権は絶対に譲りません。相手に指図されたり、自分のペースを乱されたりするのが何より嫌い。 あなたのセックスは、残酷な「選別作業」でもあります。行為中、あなたは常に冷静な審査員のような目で相手を採点しています。「この男は私のレベルに達しているか？」と品定めし、合格ラインに達しない男には容赦なく冷たく接します。あなたの夜に、無能な男の居場所はないのです。`
                    : typeCode === 'ENTJ' ?
                    `あなたには、相手を完全にコントロールする才能があります。媚びずに見下ろすその態度は、圧倒的な自信と知性の表れ。 セックスにおいても、感情的に乱れることは少なく、常に冷静に状況を支配します。 あなたのセックスは、「愛の交歓」ではなく「管理」です。相手をいかに自分の思い通りに動かすか、いかに自分に依存させるかを楽しんでいます。 乱暴な言葉は使いませんが、静かな威圧感で相手を動けなくさせ、完全に自分のペースに巻き込みます。`
                    : typeCode === 'ISFP' ?
                    `あなたは、「好き」の上が「愛してる」で、その上が「一緒に死のう」だと思っているヤンデレ予備軍です。 体だけでなく心臓ごと捧げるような、湿度100%の愛で相手を沼に引きずり込みます。 浮気は絶対に許さず、裏切られたら一生呪い続ける執念深さがあります。

セックスは「魂の融合」。 相手と体が一つになることで、心の境界線をなくし、完全に理解し合いたいと願っています。 行為中は相手の目をじっと見つめ、深い愛を確かめ合わないと満足できません。`
                    : typeCode === 'ESFP' ?
                    `ベッドの上では媚薬そのもの。媚びていない表情でも、自然と甘い雰囲気を放っている、生まれつきのエロ女。 自分の『すずちゃん』ボディに絶対的な自信を持っているし、実際にめちゃくちゃセクシー。 男性の弱い部分も本能的に分かっているので、無意識にツボを突いてきます。 あまりにもエロすぎて、一緒にいるだけで発情してしまいます。 なお、恋愛体質なので『好きになった相手としかエッチしない』というプライドもありますが、酔っぱらうと…？`
                    : typeCode === 'INFP' ?
                    `あなたは、自分に自信がなく、「私なんて…」と儚げな雰囲気を醸し出すタイプです。 激しいプレイよりも、お姫様扱いされるような甘いムードがないと心が動きません。 現実のセックスに少し恐怖心を抱いており、優しくリードして、私の全てを肯定してくれる王子様を待ち続けています。

セックスは「物語」の一部。 ロマンチックなシチュエーションや、愛の言葉がないと、ただの「痛い行為」になってしまいます。 逆に、ムードさえ完璧なら、あなたは映画のヒロインのように美しく乱れます。`
                    : character.nightEcologyReport
                  }
                </div>
              </div>

              {/* あなたのエロさの正体 */}
              <div className="bg-pink-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-pink-700 mb-3 text-center">あなたのエロさの正体</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {typeCode === 'ESTJ' ? 
                    `拒絶の美学です。

安易に隙を見せない鉄壁のプライドと、ニコリともしない高飛車な態度。 「私に触れたいなら実力を示しなさい」という無言の圧力が、逆に男性の「この女を屈服させたい」「このすました顔を歪ませたい」という征服欲を極限まで煽ります。 あなたが冷たくすればするほど、男性は燃え上がり、あなたを追いかけたくなるのです。`
                    : typeCode === 'ENTJ' ?
                    `冷たい視線です。

熱を帯びた目ではなく、冷ややかな目で見下ろされると、男性はゾクゾクして従いたくなります。 「私に触れる資格があるの？」と問いかけてくるような瞳。触れずに相手を従わせる、視覚的な暴力性を持っています。 その冷たい仮面の下に、どんな情熱が隠されているのか。それを暴きたいと思わせるミステリアスな魅力があります。`
                    : typeCode === 'ISFP' ?
                    `幸薄い儚さです。

どこか影があり、守ってあげなきゃと思わせる雰囲気。 でも近づくと底なし沼だった、という危険な魅力を持っています。 「私がいないとこの人は生きていけない」と思わせる（あるいはあなたがそう思い込む）共依存的な関係を作り出す天才です。`
                    : typeCode === 'ESFP' ?
                    `天性の愛され力です。

計算しているようでしていない、ナチュラルな媚び。 「この子には何をしても許されそう」と思わせる、甘いフェロモンを出しています。 あなたが甘えれば甘えるほど、男性は「俺が守ってやらなきゃ（あるいは俺が支配したい）」という欲求を刺激されます。`
                    : typeCode === 'INFP' ?
                    `壊れそうな脆さです。

強く触れたら壊れてしまいそうなガラス細工のような繊細さ。 それを「私が守ってあげたい」という庇護欲と、「壊してみたい」という歪んだ破壊衝動を同時に刺激します。 その消え入りそうな存在感が、逆に男性を引き寄せるのです。`
                    : character.yourSexiness
                  }
                </div>
              </div>

              {/* 本能のカルテ */}
              <div className="bg-orange-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-orange-700 mb-3 text-center">閲覧注意：本能のカルテ</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {typeCode === 'ESTJ' ? 
                    `指導熱心です。

相手の技術が未熟だと、イラッとしてつい口を出してしまいます。 「そこじゃない」「もっとこうして」と的確な指示を出し、相手がタジタジになりながら頑張る姿を見るのが、実は一番の楽しみだったりします。`
                    : typeCode === 'ENTJ' ?
                    `減点方式の完璧主義です。

相手のテクニックが下手だったり、ムード作りが雑だったりすると、露骨にため息をついたり、冷めた目で見たりして、相手の心を折ります。 「時間の無駄だったわ」と心の中で切り捨てる冷酷さを持っています。その厳しさに耐えられる男だけが、あなたの隣に立つことを許されます。`
                    : typeCode === 'ISFP' ?
                    `言葉攻めに弱いです。

「愛してる」「お前しかいない」「一生離さない」といった独占的な言葉を囁かれると、それだけでイってしまうほど精神的な繋がりを重視します。 言葉で愛を刻み込まれることに、異常な快感を覚えます。`
                    : typeCode === 'ESFP' ?
                    `快楽主義者です。

気持ちいいことが一番大事。難しいことは考えず、その瞬間に感じる快感だけに集中します。 酔っぱらうと、普段のプライドも忘れて大胆になることがあります。 『今だけ』という瞬間の魔法にかかりやすく、衝動的な行動に走ることも。 感度がいいので、ちょっとした刺激でもすぐに反応してしまいます。`
                    : typeCode === 'INFP' ?
                    `妄想の中では大胆です。

現実では奥手で受け身ですが、頭の中では少女漫画のようなドラマチックでエロティックな展開を常に繰り広げています。 実は「さらわれるお姫様」や「無理やり奪われる」といったシチュエーションに憧れを持っていたりします。`
                    : character.instinctChart
                  }
                </div>
              </div>

              {/* 夜の口癖・脳内 */}
              <div className="bg-purple-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-purple-700 mb-3 text-center">夜の口癖・脳内</h3>
                <p className="text-gray-700 leading-relaxed">
                  {typeCode === 'ESTJ' ? 
                    `下手ね（ため息） ちゃんとして 許可してないわよ（焦らし）`
                    : typeCode === 'ENTJ' ?
                    `それで終わり？ もっと頑張りなさい （冷たい目で観察している）`
                    : typeCode === 'ISFP' ?
                    `ずっと一緒だよね？ 私だけを見て （涙目で訴える）`
                    : typeCode === 'ESFP' ?
                    `あ〜ん… いいきもち〜♡ もっとぉ… （とろける顔）`
                    : typeCode === 'INFP' ?
                    `優しくしてね 怖い…かも （目をギュッと瞑る）`
                    : character.nightPhrase
                  }
                </p>
              </div>

              {/* 事後の賢者タイム */}
              <div className="bg-blue-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-blue-700 mb-3 text-center">事後の賢者タイム</h3>
                <p className="text-gray-700 leading-relaxed">
                  {typeCode === 'ESTJ' ? 
                    `優雅な女王。 終わった後は、相手にティッシュを取らせたり、水を運ばせたり、最後まで女王としての振る舞いを崩しません。 自分から動くことはなく、相手が甲斐甲斐しく世話をするのを当然のように受け入れ、「ご苦労様」という態度で労います。`
                    : typeCode === 'ENTJ' ?
                    `即・仕事モード。 終わった瞬間にスマホを手に取り、明日のスケジュールの確認や、メールの返信を始めます。 余韻に浸る相手を放置し、「もう帰るわね」とサッサと身支度を整えます。あなたにとってセックスは、タスクの一部に過ぎないのかもしれません。`
                    : typeCode === 'ISFP' ?
                    `融合タイム。 終わった後も相手と体が一体化しているかのように密着し続けます。 相手の鼓動を聞きながら、「私たちは一つになれた」と至福の時に浸ります。 離れようとすると泣きます。`
                    : typeCode === 'ESFP' ?
                    `そのまま就寝モード。 満足した猫のように、すやすやと眠りに落ちます。 後のことは何も考えず、心地よい余韻に包まれながら、彼氏を抱き枕がわりに使って熟睡します。 翌朝は何事もなかったかのように、けろっとしています。`
                    : typeCode === 'INFP' ?
                    `自己嫌悪モード。 「こんなことしちゃった…」「私なんかが気持ちよくなっていいのかな」と急に賢者になり、布団に潜り込みます。 相手が「良かったよ」と優しく肯定してくれないと、ふさぎ込んでしまいます。`
                    : character.afterTime
                  }
                </p>
              </div>

              {/* 最高のパートナー（相性◎） */}
              <div className="bg-green-50 rounded-lg p-4 text-left mb-6">
                <h3 className="text-lg font-bold text-green-700 mb-3 text-center">最高のパートナー（相性◎）</h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className="font-semibold mb-2">{typeCode === 'ENTJ' ? 'お相手：感度3000倍のオス猫（ISFP男性）' : typeCode === 'ISFP' ? 'お相手：暴走ダンプカー（ESTP男性）' : typeCode === 'ESFP' ? 'お相手：理想の王子様（ENFJ男性）' : typeCode === 'INFP' ? 'お相手：過保護なパトロン（ESFJ男性）' : 'お相手：夢見る詩人（INFP男性）'}</p>
                  <p><strong>【理由】</strong> {typeCode === 'ESTJ' ? 
                    `彼はM気質で、強い女性に憧れを持っています。 あなたの冷たい態度や理不尽な命令を、高貴で美しい、僕を導いてくれると脳内で美化し、喜んで下僕になってくれます。 あなたが何を言っても傷つかず、むしろ詩的な言葉で賛美してくれるので、あなたの高い自尊心も満たされ、Win-Winの関係になれます。`
                    : typeCode === 'ENTJ' ?
                    `彼は感覚的で甘えん坊なM気質です。 あなたの冷たい態度にもめげず、「かまって」「すごかったね」と無邪気に懐いてきます。 あなたが彼を管理・支配することで、彼は安心してあなたに依存し、あなたも「手のかかるペット」として彼を可愛がるでしょう。彼の素直さが、あなたの冷たさを溶かします。`
                    : typeCode === 'ISFP' ?
                    `彼は野性的で刺激を求めるタイプですが、実は内面に孤独を抱えています。 あなたの重すぎる愛と執着は、彼にとって「ここまで愛されたのは初めて」という新鮮な衝撃となります。 彼の激しさをあなたの深さが受け止め、お互いに欠けている部分を埋め合う、共依存に近い強烈な絆が生まれます。`
                    : typeCode === 'ESFP' ?
                    `彼は情熱的でロマンチストです。 あなたの天真爛漫な魅力に心を奪われ、全身全霊であなたを愛してくれます。 理想の王子様のように優しく、甘いムードを作るのが得意なので、あなたも安心して甘えることができます。 お互いの楽観的で前向きな性格が、明るく楽しい関係を築きます。`
                    : typeCode === 'INFP' ?
                    `彼は世話焼きで、愛情表現が豊かなタイプです。 あなたの自信のなさや不安を、「君は可愛いよ」「大丈夫だよ」と全肯定して包み込んでくれます。 彼の過保護な愛は、あなたにとって最高の安心材料となり、心を開くことができるでしょう。`
                    : `彼はM気質で、強い女性に憧れを持っています。 あなたの冷たい態度や命令を「高貴で美しい」と脳内で美化し、喜んで下僕になってくれます。 あなたが何を言っても傷つかず、むしろ詩的な言葉で賛美してくれるので、あなたの自尊心も満たされます。`
                  }</p>
                </div>
              </div>

              {/* 最悪の天敵（相性×） */}
              <div className="bg-red-50 rounded-lg p-4 text-left">
                <h3 className="text-lg font-bold text-red-700 mb-3 text-center">最悪の天敵（相性×）</h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className="font-semibold mb-2">{typeCode === 'ENTJ' ? 'お相手：忠実な番犬（ISFJ男性）' : typeCode === 'ISFP' ? 'お相手：生真面目な公務員（ISTJ男性）' : typeCode === 'ESFP' ? 'お相手：ケチな現実主義者（ISTJ男性）' : typeCode === 'INFP' ? 'お相手：無口なスナイパー（ISTP男性）' : 'お相手：性癖研究員（INTP男性）'}</p>
                  <p><strong>【理由】</strong> {typeCode === 'ESTJ' ? 
                    `彼は理屈っぽく、権威に屈しないタイプです。 あなたが命令しても、「なぜそうする必要があるの？」「効率が悪いよ」と論理的に反論してきます。 あなたのプライドは傷つけられ、ムードも最悪に。「理屈っぽい男は生理的に無理」と、あなたは即座に彼を切り捨てるでしょう。`
                    : typeCode === 'ENTJ' ?
                    `彼は尽くすタイプですが、少し重たくて粘着質です。 「大丈夫？」「寒くない？」といちいち聞いてくる彼の過剰な気遣いを、あなたは「うっとうしい」「自分で判断して」と感じます。 彼の献身はあなたには届かず、ただの面倒な男として扱われるでしょう。`
                    : typeCode === 'ISFP' ?
                    `彼は現実的で、常識的な恋愛を好みます。 あなたの「永遠」とか「魂」とかいうスピリチュアルで重い言動に、ドン引きします。 「重い」「怖い」「普通にして」と正論で返され、あなたの繊細な心は深く傷つき、闇落ちするでしょう。`
                    : typeCode === 'ESFP' ?
                    `彼は超現実主義で、お金の計算が得意なケチ男です。 あなたが「今度の旅行〜♡」「あのバッグ欲しい♡」と甘えても、「家計簿的に厳しい」「もう少し節約を」と冷静に却下されます。 楽しいことを重視するあなたには、彼の堅実すぎる生活スタイルが窮屈で、すぐに嫌になるでしょう。`
                    : typeCode === 'INFP' ?
                    `彼は超現実主義で、言葉よりも行動を重視します。 あなたの「もっと愛を囁いて」「お姫様みたいに扱って」という要望を、「面倒くさい」「ドラマの見過ぎ」と一蹴します。 彼のドライな態度にあなたは深く傷つき、「彼は私を愛していない」と絶望するでしょう。`
                    : `彼は理屈っぽく、あなたの権威に屈しません。 あなたが命令しても、「なぜそうする必要があるの？」「効率が悪いよ」と論理的に反論してきます。 あなたのプライドは傷つけられ、ムードも最悪に。「理屈っぽい男は嫌い」と、あなたは即座に彼を切り捨てるでしょう。`
                  }</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center space-y-6"
        >
          <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-3">
              あなたの夜の性格は<br className="sm:hidden" />何タイプかな？
            </h2>
            <p className="text-sm text-[#AAAAAA] mb-4">
              診断してみよう！
            </p>
            
            <Link href="/quiz/1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold py-3 px-8 rounded-lg border border-[#333333] transition-all duration-300"
              >
                診断を始める
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}