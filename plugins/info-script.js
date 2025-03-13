import os from 'os'
import util from 'util'
import sizeFormatter from 'human-readable'
import MessageType from '@whiskeysockets/baileys'
import fs from 'fs'
const ims = './bb.jpg'
import { performance } from 'perf_hooks'
let handler = async (m, { conn, usedPrefix }) => {
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
let totalreg = Object.keys(global.db.data.users).length
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
const groups = chats.filter(([id]) => id.endsWith('@g.us'))
const used = process.memoryUsage()
const { restrict } = global.db.data.settings[conn.user.jid] || {}
const { autoread } = global.opts
let old = performance.now()
let neww = performance.now()
let speed = (neww - old).toFixed(4)
let prova = { "key": {"participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo"
}, "message": { 
"orderMessage": { text: '𝐌𝐨𝐝𝐞𝐫𝐧𝐁𝐨𝐭-𝐌𝐃',
"itemCount": 2025,
"status": 1,
"surface" : 1,
    "message": 'ᵉᵈⁱᶻ ᵇʸ ᵍⁱᵘ ᵃⁿᵈ ˡᵘᶜᵃ',
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
}}, "participant": "0@s.whatsapp.net"
}
let info = `
══════ •⊰✦⊱• ══════

‼️ LA VERSIONE *PUBBLICA* DI *𝐌𝐨𝐝𝐞𝐫𝐧𝐁𝐨𝐭-𝐌𝐃* 
NON È STATA ANCORA RILASCIATA ❌
🌱 data prevista: 05/04/2025 📆

══════ •⊰✦⊱• ══════
`.trim() 
conn.reply(m.chat, info,prova, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '𝐌𝐨𝐝𝐞𝐫𝐧𝐁𝐨𝐭-𝐌𝐃,
body: 'ᵉᵈⁱᶻ ᵇʸ ᵍⁱᵘ ᵃⁿᵈ ˡᵘᶜᵃ',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: ``}}})
}
handler.help = ['infobot', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(script|git|download|scaricabot)$/i
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}