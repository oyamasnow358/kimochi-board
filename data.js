/* ============================================================
 *  きもちボード  内蔵データ（GitHub Pages で公開する版）
 * ============================================================
 *  ・ここに書いたボタンが、だれでも設定なしで使える「標準の中身」になります。
 *  ・上から順番にボタンが並びます。group ごとに1ページ目のタブになります。
 *  ・知的障害特別支援学校の小学部・中学部・高等部の授業（各教科・合わせた指導・
 *    道徳・総合・特別活動・自立活動・高等部の専門教科）を収録。
 *    先生は設定画面の「学部」で、その学部のボタンだけに しぼれます。
 *
 *  【書ける項目】
 *   name  : ボタンに表示する言葉（必須）
 *   emoji : 写真が無いときに表示する絵文字
 *   image : 写真（例 'images/kokugo.jpg'）または https:// で始まるURL
 *   yomi  : 読み上げの読み方（空なら name を読む）
 *   group : 1ページ目のタブの名前
 *   level : 表示する学部 '小' '中' '高' の組み合わせ（空ならすべての学部）
 *   color : ボタンのわくの色（例 '#FFD43B'、空なら自動）
 *
 *  【写真を入れるとき】
 *   images フォルダに写真を入れて、その行に image: 'images/ファイル名' を足します。
 *   例） { group: 'きょうか', name: 'こくご', emoji: '📖', image: 'images/kokugo.jpg', level: '小中高' },
 *   写真が読みこめないときは、自動で emoji が表示されます。
 *
 *  ⚠ 一般公開されます。児童の顔が写った写真や、利用規約で再配布が
 *    禁止されている画像は入れないでください。
 * ============================================================ */
window.KIMOCHI_DATA = {
  subjects: [
    // ── きょうか（知的障害特別支援学校の授業）──
    { group: 'きょうか', name: 'せいかつたんげん', emoji: '🗓️', yomi: 'せいかつたんげんがくしゅう', level: '小中高' },  // 生活単元学習
    { group: 'きょうか', name: 'さぎょうがくしゅう', emoji: '🔨', level: '中高' },  // 作業学習
    { group: 'きょうか', name: 'にちじょうせいかつ', emoji: '👕', yomi: 'にちじょうせいかつのしどう', level: '小中高' },  // 日常生活の指導
    { group: 'きょうか', name: 'あそび', emoji: '🧸', yomi: 'あそびのしどう', level: '小' },  // 遊びの指導
    { group: 'きょうか', name: 'こくご', emoji: '📖', level: '小中高' },  // 国語
    { group: 'きょうか', name: 'さんすう', emoji: '🔢', level: '小' },  // 算数
    { group: 'きょうか', name: 'すうがく', emoji: '📐', level: '中高' },  // 数学
    { group: 'きょうか', name: 'せいかつ', emoji: '🌱', level: '小' },  // 生活
    { group: 'きょうか', name: 'しゃかい', emoji: '🗾', level: '中高' },  // 社会
    { group: 'きょうか', name: 'りか', emoji: '🔬', level: '中高' },  // 理科
    { group: 'きょうか', name: 'おんがく', emoji: '🎵', level: '小中高' },  // 音楽
    { group: 'きょうか', name: 'ずこう', emoji: '🎨', yomi: 'ずがこうさく', level: '小' },  // 図画工作
    { group: 'きょうか', name: 'びじゅつ', emoji: '🖼️', level: '中高' },  // 美術
    { group: 'きょうか', name: 'たいいく', emoji: '🏃', level: '小' },  // 体育
    { group: 'きょうか', name: 'ほけんたいいく', emoji: '🤸', level: '中高' },  // 保健体育
    { group: 'きょうか', name: 'しょくぎょう', emoji: '💼', level: '中高' },  // 職業（中学部は職業・家庭）
    { group: 'きょうか', name: 'かてい', emoji: '🍳', level: '中高' },  // 家庭（中学部は職業・家庭）
    { group: 'きょうか', name: 'がいこくごかつどう', emoji: '🌏', level: '小' },  // 外国語活動
    { group: 'きょうか', name: 'えいご', emoji: '🔤', level: '中高' },  // 外国語
    { group: 'きょうか', name: 'じょうほう', emoji: '💻', level: '高' },  // 情報
    { group: 'きょうか', name: 'かせい', emoji: '🧵', level: '高' },  // 家政
    { group: 'きょうか', name: 'のうぎょう', emoji: '🌾', level: '高' },  // 農業
    { group: 'きょうか', name: 'こうぎょう', emoji: '🏭', level: '高' },  // 工業
    { group: 'きょうか', name: 'りゅうつう・サービス', emoji: '📦', yomi: 'りゅうつうサービス', level: '高' },  // 流通・サービス
    { group: 'きょうか', name: 'ふくし', emoji: '💗', level: '高' },  // 福祉
    { group: 'きょうか', name: 'じりつかつどう', emoji: '🧩', level: '小中高' },  // 自立活動
    { group: 'きょうか', name: 'どうとく', emoji: '💞', level: '小中高' },  // 特別の教科 道徳
    { group: 'きょうか', name: 'そうごう', emoji: '🔎', yomi: 'そうごうてきながくしゅう', level: '中' },  // 総合的な学習の時間
    { group: 'きょうか', name: 'たんきゅう', emoji: '🔍', yomi: 'そうごうてきなたんきゅう', level: '高' },  // 総合的な探究の時間
    { group: 'きょうか', name: 'がっきゅうかつどう', emoji: '🗣️', level: '小中高' },  // 学級活動
    { group: 'きょうか', name: 'じどうかい', emoji: '🙋', level: '小' },  // 児童会活動
    { group: 'きょうか', name: 'せいとかい', emoji: '🙋', level: '中高' },  // 生徒会活動
    { group: 'きょうか', name: 'クラブ', emoji: '🏓', yomi: 'クラブかつどう', level: '小' },  // クラブ活動
    // ── まいにち（学校生活）──
    { group: 'まいにち', name: 'あさのかい', emoji: '☀️' },  // 朝の会
    { group: 'まいにち', name: 'きゅうしょく', emoji: '🍚' },  // 給食
    { group: 'まいにち', name: 'はみがき', emoji: '🪥' },  // 歯みがき
    { group: 'まいにち', name: 'そうじ', emoji: '🧹' },  // 掃除
    { group: 'まいにち', name: 'やすみじかん', emoji: '⚽' },  // 休み時間
    { group: 'まいにち', name: 'かえりのかい', emoji: '👋' },  // 帰りの会
    // ── ぎょうじ（学校行事）──
    { group: 'ぎょうじ', name: 'にゅうがくしき', emoji: '🌸' },  // 入学式
    { group: 'ぎょうじ', name: 'えんそく', emoji: '🎒' },  // 遠足
    { group: 'ぎょうじ', name: 'うんどうかい', emoji: '🏅' },  // 運動会
    { group: 'ぎょうじ', name: 'しゃかいたいけんがくしゅう', emoji: '🚃' },  // 社会体験学習
    { group: 'ぎょうじ', name: 'しゅくはくがくしゅう', emoji: '🏨' },  // 宿泊学習
    { group: 'ぎょうじ', name: 'しゅうがくりょこう', emoji: '🚄' },  // 修学旅行
    { group: 'ぎょうじ', name: 'しょくばたいけん', emoji: '🏪', level: '中' },  // 職場体験
    { group: 'ぎょうじ', name: 'げんばじっしゅう', emoji: '🏢', level: '高' },  // 現場実習
    { group: 'ぎょうじ', name: 'ぶんかさい', emoji: '🎭' },  // 文化祭・学習発表会
    { group: 'ぎょうじ', name: 'はっぴょうかい', emoji: '🎤' },  // 発表会
    { group: 'ぎょうじ', name: 'こうりゅうかい', emoji: '🤝' },  // 交流会・交流及び共同学習
    { group: 'ぎょうじ', name: 'はんぷかい', emoji: '🛍️', level: '中高' },  // 作業製品の頒布会
    { group: 'ぎょうじ', name: 'ひなんくんれん', emoji: '🚨' },  // 避難訓練
    { group: 'ぎょうじ', name: 'そつぎょうしき', emoji: '🎓' }   // 卒業式
  ],
  feelings: [
    { name: 'たのしかった', emoji: '😄', color: '#FFD43B' },
    { name: 'おもしろかった', emoji: '🤣', color: '#FFC078' },
    { name: 'うれしかった', emoji: '😊', color: '#FFA8C5' },
    { name: 'できた', emoji: '👍', color: '#69DB7C' },
    { name: 'がんばった', emoji: '💪', color: '#38D9A9' },
    { name: 'ふつう', emoji: '🙂', color: '#E9ECEF' },
    { name: 'むずかしかった', emoji: '🤔', color: '#74C0FC' },
    { name: 'つかれた', emoji: '😪', color: '#B197FC' },
    { name: 'どきどきした', emoji: '😳', color: '#FFA94D' },
    { name: 'くやしかった', emoji: '😤', color: '#FF8787' },
    { name: 'かなしかった', emoji: '😢', color: '#91A7FF' },
    { name: 'いやだった', emoji: '😣', color: '#ADB5BD' }
  ]
};
