/* ============================================================
 *  きもちボード  内蔵データ（GitHub Pages で公開する版）
 * ============================================================
 *  ・ここに書いたボタンが、だれでも設定なしで使える「標準の中身」になります。
 *  ・上から順番にボタンが並びます。
 *
 *  【写真の入れ方】
 *   1. 写真を images フォルダに入れる（横 600px くらいの JPG / PNG がおすすめ）
 *   2. 下の image: に 'images/ファイル名' を書く
 *      写真がまだ無い・読みこめないときは、自動で emoji が表示されます。
 *
 *  【書ける項目】
 *   name  : ボタンに表示する言葉（必須）
 *   emoji : 写真が無いときに表示する絵文字
 *   image : 写真のパス（'images/kokugo.jpg'）または https:// で始まるURL
 *   yomi  : 読み上げの読み方（空なら name を読む）
 *   color : ボタンのわくの色（例 '#FFD43B'、空なら自動）
 *   group : 1ページ目のタブの名前（'まいにち' 'ぎょうじ' など。気持ちには不要）
 *
 *  ⚠ 一般公開されます。児童の顔が写った写真や、利用規約で再配布が
 *    禁止されている画像は入れないでください。
 * ============================================================ */
window.KIMOCHI_DATA = {
  subjects: [
    // ── まいにち（授業・生活） ──
    { group: 'まいにち', name: 'こくご',       emoji: '📖', image: 'images/kokugo.jpg' },
    { group: 'まいにち', name: 'さんすう',     emoji: '🔢', image: 'images/sansu.jpg' },
    { group: 'まいにち', name: 'せいかつ',     emoji: '🌱', image: 'images/seikatsu.jpg' },
    { group: 'まいにち', name: 'おんがく',     emoji: '🎵', image: 'images/ongaku.jpg' },
    { group: 'まいにち', name: 'ずこう',       emoji: '🎨', image: 'images/zukou.jpg' },
    { group: 'まいにち', name: 'たいいく',     emoji: '🏃', image: 'images/taiiku.jpg' },
    { group: 'まいにち', name: 'じりつ',       emoji: '🧩', image: 'images/jiritsu.jpg', yomi: 'じりつかつどう' },
    { group: 'まいにち', name: 'きゅうしょく', emoji: '🍚', image: 'images/kyushoku.jpg' },
    { group: 'まいにち', name: 'そうじ',       emoji: '🧹', image: 'images/souji.jpg' },
    { group: 'まいにち', name: 'あそび',       emoji: '⚽', image: 'images/asobi.jpg' },
    // ── ぎょうじ（行事） ──
    { group: 'ぎょうじ', name: 'しゃかいたいけんがくしゅう', emoji: '🚃', image: 'images/shakaitaiken.jpg' },
    { group: 'ぎょうじ', name: 'しゅくはくがくしゅう',       emoji: '🏨', image: 'images/shukuhaku.jpg' },
    { group: 'ぎょうじ', name: 'しゅうがくりょこう',         emoji: '🚄', image: 'images/shugakuryoko.jpg' },
    { group: 'ぎょうじ', name: 'えんそく',                   emoji: '🎒', image: 'images/ensoku.jpg' },
    { group: 'ぎょうじ', name: 'うんどうかい',               emoji: '🏅', image: 'images/undokai.jpg' },
    { group: 'ぎょうじ', name: 'ぶんかさい',                 emoji: '🎭', image: 'images/bunkasai.jpg' },
    { group: 'ぎょうじ', name: 'はっぴょうかい',             emoji: '🎤', image: 'images/happyokai.jpg' },
    { group: 'ぎょうじ', name: 'こうりゅうかい',             emoji: '🤝', image: 'images/koryukai.jpg' },
    { group: 'ぎょうじ', name: 'はんぷかい',                 emoji: '🛍️', image: 'images/hanpukai.jpg' }
  ],
  feelings: [
    { name: 'たのしかった',   emoji: '😄', image: 'images/tanoshikatta.jpg',   color: '#FFD43B' },
    { name: 'できた',         emoji: '👍', image: 'images/dekita.jpg',         color: '#69DB7C' },
    { name: 'うれしかった',   emoji: '😊', image: 'images/ureshikatta.jpg',    color: '#FFA8C5' },
    { name: 'むずかしかった', emoji: '🤔', image: 'images/muzukashikatta.jpg', color: '#74C0FC' },
    { name: 'つかれた',       emoji: '😪', image: 'images/tsukareta.jpg',      color: '#B197FC' },
    { name: 'どきどきした',   emoji: '😳', image: 'images/dokidoki.jpg',       color: '#FFA94D' },
    { name: 'かなしかった',   emoji: '😢', image: 'images/kanashikatta.jpg',   color: '#91A7FF' },
    { name: 'いやだった',     emoji: '😣', image: 'images/iyadatta.jpg',       color: '#ADB5BD' }
  ]
};
