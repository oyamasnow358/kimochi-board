/**
 * ============================================================
 *  きもちボード  バックエンド（Google Apps Script）
 * ============================================================
 *  ・スプレッドシート「master」シートの内容を JSON で返します。
 *  ・同じプロジェクトに HTML ファイル「index」を作っておくと、
 *    ウェブアプリの URL を開くだけでアプリ画面がそのまま表示されます。
 *  ・（任意）「log」シートに、えらんだ結果を記録できます。
 *
 *  使い方の詳細は「セットアップ手順.html」を見てください。
 * ============================================================
 */

// ▼ シートの名前（変更したい場合はここを書きかえます）
const SHEET_NAME = 'master';
const LOG_SHEET_NAME = 'log';

// ▼ 通常は空のままでOK。
//   スプレッドシート「以外」から Apps Script を作った場合だけ、
//   スプレッドシートのURLの /d/ と /edit の間の文字列を入れてください。
const SPREADSHEET_ID = '';

// 列の見出し（1行目）。日本語の見出しでも読み取れるように別名を用意しています。
const HEADER_ALIASES = {
  id:       ['id', '番号', 'ばんごう'],
  category: ['category', 'カテゴリ', 'カテゴリー', '種類', 'しゅるい', '分類'],
  name:     ['name', '表示名', 'なまえ', '名前', 'ひょうじめい'],
  emoji:    ['emoji', '絵文字', 'えもじ'],
  imageUrl: ['imageurl', 'image', 'imageuri', '画像', '画像url', '写真', '写真url', 'がぞう'],
  yomi:     ['yomi', 'よみ', '読み', 'よみかた', '読み方'],
  color:    ['color', '色', 'いろ'],
  show:     ['show', 'visible', '表示', 'ひょうじ'],
  group:    ['group', 'グループ', 'タブ', 'ぐるーぷ'],
  level:    ['level', '学部', 'がくぶ']
};

/* ------------------------------------------------------------
 *  ウェブアプリの入り口
 *   ・…/exec            → アプリ画面（HTMLファイル「index」）
 *   ・…/exec?api=data   → データ（JSON）
 * ---------------------------------------------------------- */
function doGet(e) {
  const p = (e && e.parameter) || {};

  if (p.api === 'data' || p.format === 'json') {
    return jsonOutput_(safeGetData_());
  }

  try {
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('きもちボード')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
      .addMetaTag('apple-mobile-web-app-capable', 'yes')
      .addMetaTag('mobile-web-app-capable', 'yes')
      .addMetaTag('apple-mobile-web-app-title', 'きもちボード')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    // HTMLファイル「index」をまだ作っていない場合
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;font-size:20px;line-height:1.8;padding:24px">' +
      '<b>きもちボードのサーバーは動いています。</b><br>' +
      'アプリ画面を出すには、Apps Script に HTML ファイル「index」を追加してください。<br>' +
      'データ（JSON）は、このURLの最後に <code>?api=data</code> をつけると確認できます。</div>'
    ).setTitle('きもちボード');
  }
}

/* ------------------------------------------------------------
 *  記録（別の場所に置いたHTMLから送られてくる場合）
 * ---------------------------------------------------------- */
function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    logResult(body);
    return jsonOutput_({ ok: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err && err.message || err) });
  }
}

/* ------------------------------------------------------------
 *  データ取得（アプリ画面から google.script.run でも呼ばれます）
 * ---------------------------------------------------------- */
function getData() {
  const sheet = getSpreadsheet_().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('シート「' + SHEET_NAME + '」が見つかりません。関数 setupSampleSheet を実行してください。');
  }

  const values = sheet.getDataRange().getValues();
  const subjects = [];
  const feelings = [];

  if (values.length >= 2) {
    const keys = values[0].map(headerKey_);

    for (let r = 1; r < values.length; r++) {
      const row = {};
      keys.forEach(function (k, i) { if (k) row[k] = values[r][i]; });

      const name = str_(row.name);
      if (!name) continue;               // 名前が空の行はとばす
      if (isHidden_(row.show)) continue; // show が FALSE の行はとばす

      const item = {
        id: str_(row.id) || ('row' + (r + 1)),
        name: name,
        emoji: str_(row.emoji),
        imageUrl: toDirectImageUrl_(str_(row.imageUrl)),
        yomi: str_(row.yomi),
        color: str_(row.color),
        group: str_(row.group),
        level: str_(row.level)
      };

      const type = categoryType_(row.category);
      if (type === 'subject') subjects.push(item);
      else if (type === 'feeling') feelings.push(item);
    }
  }

  return {
    ok: true,
    subjects: subjects,
    feelings: feelings,
    updatedAt: new Date().toISOString()
  };
}

/* ------------------------------------------------------------
 *  結果の記録（「log」シートに1行追加）
 * ---------------------------------------------------------- */
function logResult(obj) {
  obj = obj || {};
  const subject = str_(obj.subject).slice(0, 100);
  const feeling = str_(obj.feeling).slice(0, 100);
  if (!subject && !feeling) return { ok: false };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = getSpreadsheet_();
    let sheet = ss.getSheetByName(LOG_SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(LOG_SHEET_NAME);
      sheet.appendRow(['日時', '教科・活動', '気持ち']);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#FFE8A3');
    }
    sheet.appendRow([new Date(), subject, feeling]);
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}

/* ------------------------------------------------------------
 *  はじめに1回だけ実行：サンプルの「master」シートを作ります
 * ---------------------------------------------------------- */
function setupSampleSheet() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (sheet && sheet.getLastRow() > 1) {
    notify_('「' + SHEET_NAME + '」シートにはすでにデータがあるので、何もしませんでした。');
    return;
  }
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME, 0);

  const header = ['id', 'category', 'name', 'emoji', 'imageUrl', 'yomi', 'color', 'show', 'group', 'level'];
  const rows = [
    ['s01', '教科', 'こくご', '📖', '', '', '', true, 'きょうか', '小中高'],
    ['s02', '教科', 'しゃかい', '🗾', '', '', '', true, 'きょうか', '小中高'],
    ['s03', '教科', 'さんすう', '🔢', '', '', '', true, 'きょうか', '小'],
    ['s04', '教科', 'すうがく', '📐', '', '', '', true, 'きょうか', '中高'],
    ['s05', '教科', 'りか', '🔬', '', '', '', true, 'きょうか', '小中高'],
    ['s06', '教科', 'せいかつ', '🌱', '', '', '', true, 'きょうか', '小'],
    ['s07', '教科', 'おんがく', '🎵', '', '', '', true, 'きょうか', '小中高'],
    ['s08', '教科', 'ずこう', '🎨', '', 'ずがこうさく', '', true, 'きょうか', '小'],
    ['s09', '教科', 'びじゅつ', '🖼️', '', '', '', true, 'きょうか', '中高'],
    ['s10', '教科', 'たいいく', '🏃', '', '', '', true, 'きょうか', '小'],
    ['s11', '教科', 'ほけんたいいく', '🤸', '', '', '', true, 'きょうか', '中高'],
    ['s12', '教科', 'かてい', '🍳', '', '', '', true, 'きょうか', '小高'],
    ['s13', '教科', 'ぎじゅつ・かてい', '🔧', '', 'ぎじゅつかてい', '', true, 'きょうか', '中'],
    ['s14', '教科', 'しょくぎょう・かてい', '🧺', '', 'しょくぎょうかてい', '', true, 'きょうか', '中'],
    ['s15', '教科', 'しょくぎょう', '💼', '', '', '', true, 'きょうか', '高'],
    ['s16', '教科', 'えいご', '🔤', '', '', '', true, 'きょうか', '小中高'],
    ['s17', '教科', 'じょうほう', '💻', '', '', '', true, 'きょうか', '高'],
    ['s18', '教科', 'ちり・れきし', '🏯', '', 'ちりれきし', '', true, 'きょうか', '高'],
    ['s19', '教科', 'こうみん', '⚖️', '', '', '', true, 'きょうか', '高'],
    ['s20', '教科', 'かせい', '🧵', '', '', '', true, 'きょうか', '高'],
    ['s21', '教科', 'のうぎょう', '🌾', '', '', '', true, 'きょうか', '高'],
    ['s22', '教科', 'こうぎょう', '🏭', '', '', '', true, 'きょうか', '高'],
    ['s23', '教科', 'りゅうつう・サービス', '📦', '', 'りゅうつうサービス', '', true, 'きょうか', '高'],
    ['s24', '教科', 'ふくし', '💗', '', '', '', true, 'きょうか', '高'],
    ['s25', '教科', 'にちじょうせいかつ', '👕', '', 'にちじょうせいかつのしどう', '', true, 'かつどう', '小中高'],
    ['s26', '教科', 'あそび', '🧸', '', 'あそびのしどう', '', true, 'かつどう', '小'],
    ['s27', '教科', 'せいかつたんげん', '🗓️', '', 'せいかつたんげんがくしゅう', '', true, 'かつどう', '小中高'],
    ['s28', '教科', 'さぎょうがくしゅう', '🔨', '', '', '', true, 'かつどう', '中高'],
    ['s29', '教科', 'じりつかつどう', '🧩', '', '', '', true, 'かつどう', '小中高'],
    ['s30', '教科', 'どうとく', '💞', '', '', '', true, 'かつどう', '小中高'],
    ['s31', '教科', 'がいこくごかつどう', '🌏', '', '', '', true, 'かつどう', '小'],
    ['s32', '教科', 'そうごう', '🔎', '', 'そうごうてきながくしゅう', '', true, 'かつどう', '中'],
    ['s33', '教科', 'たんきゅう', '🔍', '', 'そうごうてきなたんきゅう', '', true, 'かつどう', '高'],
    ['s34', '教科', 'がっきゅうかつどう', '🗣️', '', '', '', true, 'かつどう', '小中高'],
    ['s35', '教科', 'じどうかい', '🙋', '', '', '', true, 'かつどう', '小'],
    ['s36', '教科', 'せいとかい', '🙋', '', '', '', true, 'かつどう', '中高'],
    ['s37', '教科', 'クラブ', '🏓', '', 'クラブかつどう', '', true, 'かつどう', '小'],
    ['s38', '教科', 'あさのかい', '☀️', '', '', '', true, 'まいにち', ''],
    ['s39', '教科', 'きゅうしょく', '🍚', '', '', '', true, 'まいにち', ''],
    ['s40', '教科', 'はみがき', '🪥', '', '', '', true, 'まいにち', ''],
    ['s41', '教科', 'そうじ', '🧹', '', '', '', true, 'まいにち', ''],
    ['s42', '教科', 'やすみじかん', '⚽', '', '', '', true, 'まいにち', ''],
    ['s43', '教科', 'かえりのかい', '👋', '', '', '', true, 'まいにち', ''],
    ['s44', '行事', 'にゅうがくしき', '🌸', '', '', '', true, 'ぎょうじ', ''],
    ['s45', '行事', 'えんそく', '🎒', '', '', '', true, 'ぎょうじ', ''],
    ['s46', '行事', 'うんどうかい', '🏅', '', '', '', true, 'ぎょうじ', ''],
    ['s47', '行事', 'しゃかいたいけんがくしゅう', '🚃', '', '', '', true, 'ぎょうじ', ''],
    ['s48', '行事', 'しゅくはくがくしゅう', '🏨', '', '', '', true, 'ぎょうじ', ''],
    ['s49', '行事', 'しゅうがくりょこう', '🚄', '', '', '', true, 'ぎょうじ', ''],
    ['s50', '行事', 'しょくばたいけん', '🏪', '', '', '', true, 'ぎょうじ', '中'],
    ['s51', '行事', 'げんばじっしゅう', '🏢', '', '', '', true, 'ぎょうじ', '高'],
    ['s52', '行事', 'ぶんかさい', '🎭', '', '', '', true, 'ぎょうじ', ''],
    ['s53', '行事', 'はっぴょうかい', '🎤', '', '', '', true, 'ぎょうじ', ''],
    ['s54', '行事', 'こうりゅうかい', '🤝', '', '', '', true, 'ぎょうじ', ''],
    ['s55', '行事', 'はんぷかい', '🛍️', '', '', '', true, 'ぎょうじ', '中高'],
    ['s56', '行事', 'ひなんくんれん', '🚨', '', '', '', true, 'ぎょうじ', ''],
    ['s57', '行事', 'そつぎょうしき', '🎓', '', '', '', true, 'ぎょうじ', ''],
    ['f01', '気持ち', 'たのしかった', '😄', '', '', '#FFD43B', true, '', ''],
    ['f02', '気持ち', 'おもしろかった', '🤣', '', '', '#FFC078', true, '', ''],
    ['f03', '気持ち', 'うれしかった', '😊', '', '', '#FFA8C5', true, '', ''],
    ['f04', '気持ち', 'できた', '👍', '', '', '#69DB7C', true, '', ''],
    ['f05', '気持ち', 'がんばった', '💪', '', '', '#38D9A9', true, '', ''],
    ['f06', '気持ち', 'ふつう', '🙂', '', '', '#E9ECEF', true, '', ''],
    ['f07', '気持ち', 'むずかしかった', '🤔', '', '', '#74C0FC', true, '', ''],
    ['f08', '気持ち', 'つかれた', '😪', '', '', '#B197FC', true, '', ''],
    ['f09', '気持ち', 'どきどきした', '😳', '', '', '#FFA94D', true, '', ''],
    ['f10', '気持ち', 'くやしかった', '😤', '', '', '#FF8787', true, '', ''],
    ['f11', '気持ち', 'かなしかった', '😢', '', '', '#91A7FF', true, '', ''],
    ['f12', '気持ち', 'いやだった', '😣', '', '', '#ADB5BD', true, '', '']
  ];

  sheet.clear();
  sheet.getRange(1, 1, 1, header.length).setValues([header])
    .setFontWeight('bold').setBackground('#FFE8A3');
  sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
  sheet.setFrozenRows(1);

  // category 列はプルダウンで選べるようにする
  const catRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['教科', '行事', '気持ち'], true).setAllowInvalid(true).build();
  sheet.getRange(2, 2, 200, 1).setDataValidation(catRule);

  // show 列はチェックボックス
  sheet.getRange(2, 8, rows.length, 1).insertCheckboxes();

  sheet.setColumnWidth(1, 60);
  sheet.setColumnWidth(2, 90);
  sheet.setColumnWidth(3, 140);
  sheet.setColumnWidth(4, 70);
  sheet.setColumnWidth(5, 320);
  sheet.setColumnWidth(6, 150);
  sheet.setColumnWidth(7, 90);
  sheet.setColumnWidth(8, 60);
  sheet.setColumnWidth(9, 100);
  sheet.setColumnWidth(10, 70);

  notify_('サンプルの「' + SHEET_NAME + '」シートを作りました！');
}

/* ------------------------------------------------------------
 *  スプレッドシートを開いたときにメニューを追加
 * ---------------------------------------------------------- */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('きもちボード')
    .addItem('サンプルデータを作る', 'setupSampleSheet')
    .addItem('データの読みこみテスト', 'testGetData')
    .addToUi();
}

/** エディタから実行して、データが正しく読めるか確認できます */
function testGetData() {
  const d = getData();
  notify_('教科・活動: ' + d.subjects.length + ' 件 / 気持ち: ' + d.feelings.length + ' 件 読みこめました。');
  Logger.log(JSON.stringify(d, null, 2));
}

/* ============================================================
 *  ここから下は内部で使う道具です（さわらなくてOK）
 * ============================================================ */

function getSpreadsheet_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('スプレッドシートが見つかりません。SPREADSHEET_ID を設定してください。');
  return ss;
}

function safeGetData_() {
  try {
    return getData();
  } catch (err) {
    return { ok: false, error: String(err && err.message || err) };
  }
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function str_(v) {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

function headerKey_(h) {
  const s = String(h || '').trim().toLowerCase().replace(/[\s_　]/g, '');
  for (const key in HEADER_ALIASES) {
    if (HEADER_ALIASES[key].indexOf(s) !== -1) return key;
  }
  return '';
}

function isHidden_(v) {
  if (v === false) return true;
  const s = str_(v).toLowerCase();
  return /^(false|0|no|off|いいえ|×|x|非表示|かくす)$/.test(s);
}

function categoryType_(v) {
  const s = str_(v).toLowerCase();
  if (/気持|きもち|感想|かんそう|feel/.test(s)) return 'feeling';
  if (/教科|きょうか|活動|かつどう|行事|ぎょうじ|subject|activity|event/.test(s)) return 'subject';
  return '';
}

/** Googleドライブの共有リンクを、画像として表示できるURLに変換します */
function toDirectImageUrl_(url) {
  if (!url) return '';
  const m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/) ||
            url.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?(?:.*&)?id=([\w-]+)/);
  if (m) return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w600';
  return url;
}

function notify_(msg) {
  Logger.log(msg);
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { /* エディタから実行したときは表示しない */ }
}
