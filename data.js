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
 *
 *  ⚠ 一般公開されます。児童の顔が写った写真や、利用規約で再配布が
 *    禁止されている画像は入れないでください。
 * ============================================================ */
window.KIMOCHI_DATA = {
  subjects: [
    { name: 'こくご',       emoji: '📖', image: 'images/kokugo.jpg' },
    { name: 'さんすう',     emoji: '🔢', image: 'images/sansu.jpg' },
    { name: 'せいかつ',     emoji: '🌱', image: 'images/seikatsu.jpg' },
    { name: 'おんがく',     emoji: '🎵', image: 'images/ongaku.jpg' },
    { name: 'ずこう',       emoji: '🎨', image: 'images/zukou.jpg' },
    { name: 'たいいく',     emoji: '🏃', image: 'images/taiiku.jpg' },
    { name: 'じりつ',       emoji: '🧩', image: 'images/jiritsu.jpg', yomi: 'じりつかつどう' },
    { name: 'きゅうしょく', emoji: '🍚', image: 'images/kyushoku.jpg' },
    { name: 'そうじ',       emoji: '🧹', image: 'images/souji.jpg' },
    { name: 'あそび',       emoji: '⚽', image: 'images/asobi.jpg' }
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
