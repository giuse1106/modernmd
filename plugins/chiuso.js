let handler = async (m, { conn, participants, isAdmin, isOwner }) => {
    if (!isAdmin && !isOwner) return conn.reply(m.chat, "❌ *Solo gli admin possono usare questo comando!*", m);

    await conn.groupSettingUpdate(m.chat, 'announcement'); // Imposta la chat solo per gli admin

    let admins = participants.filter(p => p.admin).map(p => "➤ @" + p.id.split("@")[0]).join("\n");

    let message = `📢 *:: 𝐜𝐡𝐚𝐭 𝐚𝐝𝐦𝐢𝐧 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚!* 🔒\n\n 👑 *Tag admin:*\n${admins}`;

    let locationEmbed = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "AdminChat" },
        message: {
            locationMessage: {
                name: "🔒 𝐂𝐇𝐀𝐓 𝐀𝐃𝐌𝐈𝐌",
                degreesLatitude: 0,
                degreesLongitude: 0
            }
        },
        participant: "0@s.whatsapp.net"
    };

    await conn.sendMessage(m.chat, { text: message, mentions: participants.map(p => p.id) }, { quoted: locationEmbed });
};

handler.command = /^chiuso$/i;
handler.admin = true;
handler.group = true;

export default handler;