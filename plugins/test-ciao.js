let handler = async (m, { conn }) => {
    const createEmbedTag = async () => {
        return {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "TagEmbed"
            },
            message: {
                locationMessage: {
                    name: "ModernMD", // Nome del bot
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:ModernMD\nORG:ModernMD Bot\nTEL;type=CELL;type=VOICE:+1 (555) 123-4567\nEND:VCARD` // VCard con il nome del bot e un numero di telefono fittizio
                }
            },
            participant: "0@s.whatsapp.net"
        };
    };

    let embed = await createEmbedTag();
    
    await conn.sendMessage(m.chat, embed);
    
    await conn.sendMessage(m.chat, {
        text: '> Benvenuto in 𝐌𝐨𝐝𝐞𝐫𝐧𝐌𝐃 \n> miglior bot WhatsApp Italiano 🇮🇹\n> Nuovi comandi arriverano nel tempo! ‍↕️',
    }, { quoted: m });
};

handler.command = /^(ciao|salve|hello)$/i;
handler.group = true; 

export default handler;