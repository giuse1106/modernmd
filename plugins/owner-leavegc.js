let handler = async (m, { conn, args, command }) => {
await m.reply(`𝐌𝐢 𝐬𝐨𝐧𝐨 𝐫𝐨𝐭𝐭𝐨 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨 𝐝𝐢 𝐟𝐚𝐫𝐞 𝐢𝐥 𝐛𝐨𝐭 𝐝𝐢 𝐭𝐮𝐫𝐧𝐨.💩 𝐓𝐫𝐨𝐯𝐚𝐭𝐞𝐯𝐞𝐧𝐞 𝐮𝐧'𝐚𝐥𝐭𝐫𝐨!🤭`) 
await m.reply(`Leggi questo avviso: https://whatsapp.com/channel/0029Vb6jzwf96H4SnSf4kf01/128`)
await  conn.groupLeave(m.chat)}
handler.command = /^(out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true
export default handler
