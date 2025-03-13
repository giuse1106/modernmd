let handler = async (m, { conn }) => {
    const createEmbedTag = async () => {
        const IMAGE_URL = "https://i.imgur.com/T4NjF1V.png"; // Cambia con la tua immagine

        return {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "TagEmbed"
            },
            message: {
                locationMessage: {
                    name: "🖥️ 𝐌𝐨𝐝𝐞𝐫𝐧𝐌𝐃 🖥️",
                    jpegThumbnail: await (await fetch(IMAGE_URL)).buffer(),
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Tag;;;\nFN:Tag\nEND:VCARD"
                }
            },
            participant: "0@s.whatsapp.net"
        };
    };

    let embed = await createEmbedTag();
    
    await conn.sendMessage(m.chat, embed);
    
    await conn.sendMessage(m.chat, {
        text: '> Benvenuto in 𝐌𝐨𝐝𝐞𝐫𝐧𝐌𝐃 😜\n> miglior bot WhatsApp Italiano 🇮🇹\n> Nuovi comandi arriverano nel tempo! 🙂‍↕️',
    }, { quoted: m });
};

handler.command = /^(ciao|salve|hello)$/i;
handler.group = true; 

export default handler;