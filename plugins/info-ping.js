import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import _0x28b676 from 'node-fetch';
import { performance } from 'perf_hooks';
let handler = async (_0x215ece, {
  conn: _0x5629f1,
  usedPrefix: _0x8e3e0a
}) => {
  let _0x1bdd1c = process.uptime() * 1000;
  let _0x4f10fa = clockString(_0x1bdd1c);
  let _0x32cb68 = performance.now();
  let _0x1a4db1 = performance.now();
  let _0xc4f9d1 = (_0x1a4db1 - _0x32cb68).toFixed(4);
  let _0x21653e = global.db.data.nomedelbot || "𝐌𝐨𝐝𝐞𝐫𝐧𝐁𝐨𝐭-𝐌𝐃";
  let _0x44bf56 = await _0x28b676('https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg');
  if (!_0x44bf56.ok) {
    throw new Error("Errore durante la richiesta: " + _0x44bf56.status);
  }
  let _0x138753 = ("🟢 𝐀𝐭𝐭𝐢𝐯𝐢𝐭𝐚' : " + _0x4f10fa + "\n🚀 𝐕𝐞𝐥𝐨𝐜𝐢𝐭𝐚' : " + _0xc4f9d1 + " 𝐬\n" + "🏓 𝐏𝐨𝐧𝐠! 𝐈𝐥 𝐛𝐨𝐭 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚 𝐜𝐨𝐫𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞! 🎉" ).trim();
  _0x5629f1.sendMessage(_0x215ece.chat, {
    'text': _0x138753,
    'contextInfo': {
      'mentionedJid': _0x5629f1.parseMention(wm),
      'forwardingScore': 9999,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': '120363378147644537@newsletter',
        'serverMessageId': '',
        'newsletterName': '' + _0x21653e
      }
    }
  });
};
handler.help = ["infobot", 'speed'];
handler.tags = ["info", "tools"];
handler.command = /^(ping)$/i;
export default handler;
function clockString(_0x5ced8e) {
  let _0x398f8f = Math.floor(_0x5ced8e / 3600000);
  let _0x4fcd0c = Math.floor(_0x5ced8e / 60000) % 60;
  let _0x262fe5 = Math.floor(_0x5ced8e / 1000) % 60;
  console.log({
    'ms': _0x5ced8e,
    'h': _0x398f8f,
    'm': _0x4fcd0c,
    's': _0x262fe5
  });
  return [_0x398f8f, _0x4fcd0c, _0x262fe5].map(_0x2a1755 => _0x2a1755.toString().padStart(2, 0)).join(':');
}