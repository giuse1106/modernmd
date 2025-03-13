let handler = async (m, { conn }) => {
    const createEmbedTag = async () => {
        return {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "TagEmbed"
            },
            message: {
                locationMessage: {}
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