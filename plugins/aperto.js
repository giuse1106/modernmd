let handler = async (m, { conn, isAdmin, isOwner }) => {
    if (!isAdmin && !isOwner) return conn.reply(m.chat, "❌ *Solo gli admin possono usare questo comando!*", m);

    await conn.groupSettingUpdate(m.chat, 'not_announcement'); // Imposta la chat per tutti

    let message = `✅ *:: 𝐋𝐚 𝐜𝐡𝐚𝐭 𝐩𝐮𝐛𝐛𝐥𝐢𝐜𝐚 𝐞̀ 𝐬𝐭𝐚𝐭𝐚 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚!* 🚀\n\n✉️ *Ora tutti possono scrivere!*`;

    let locationEmbed = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "PublicChat" },
        message: {
            locationMessage: {
                name: "🌍 𝐂𝐇𝐀𝐓 𝐏𝐔𝐁𝐁𝐋𝐈𝐂𝐀",
                degreesLatitude: 0,
                degreesLongitude: 0
            }
        },
        participant: "0@s.whatsapp.net"
    };

    await conn.sendMessage(m.chat, { text: message }, { quoted: locationEmbed });
};

handler.command = /^aperto$/i;
handler.admin = true;
handler.group = true;

export default handler;