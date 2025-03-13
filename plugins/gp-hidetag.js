import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
    try {
        let users = participants.map(u => conn.decodeJid(u.id));
        let senderMention = `@${m.sender.split('@')[0]}`;
        let quotedMention = m.quoted ? `Message by @${m.quoted.sender.split('@')[0]}` : '';
        let messageText = text || (m.quoted ? m.quoted.text : ""); // Se non c'è testo, prende quello della risposta

        // 📌 Formato messaggio
        let formattedMessage = `Tag by ${senderMention}\n${quotedMention ? quotedMention + '\n' : ''}\n📝: ${messageText}`;

        // 📸 CAMBIA L'IMMAGINE DELL'EMBED QUI!
        let thumbnailUrl = "https://i.imgur.com/FRO6A2O.jpeg"; // 🔄 Cambia qui l'immagine dell'embed

        // 🗺️ EMBED DI POSIZIONE
        let locationEmbed = {
            key: {
                participants: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                fromMe: false,
                id: "HideTag"
            },
            message: {
                locationMessage: {
                    name: "👀 𝐇𝐢𝐝𝐞𝐓𝐚𝐠",
                    jpegThumbnail: await (await fetch(thumbnailUrl)).buffer(), // Usa l'immagine personalizzata
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
                }
            },
            participant: '0@s.whatsapp.net'
        };

        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || "";
        let isMedia = /image|video|sticker|audio/.test(mime);

        if (isMedia) {
            // 📌 SE È MEDIA (FOTO, VIDEO, AUDIO, STICKER)
            let media = await quoted.download();
            let options = {
                mentions: users,
                caption: formattedMessage
            };

            if (/image/.test(mime)) {
                await conn.sendMessage(m.chat, { image: media, ...options }, { quoted: locationEmbed });
            } else if (/video/.test(mime)) {
                await conn.sendMessage(m.chat, { video: media, ...options, mimetype: "video/mp4" }, { quoted: locationEmbed });
            } else if (/audio/.test(mime)) {
                await conn.sendMessage(m.chat, { audio: media, ...options, mimetype: "audio/mp4", fileName: "Hidetag.mp3" }, { quoted: locationEmbed });
            } else if (/sticker/.test(mime)) {
                await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: locationEmbed });
            }
        } else {
            // 📌 SE È SOLO TESTO
            await conn.sendMessage(m.chat, { text: formattedMessage, mentions: users }, { quoted: locationEmbed });
        }
    } catch (error) {
        console.error("Errore in .hidetag:", error);
        conn.reply(m.chat, "❌ Errore nell'esecuzione del comando!", m);
    }
};

// 📌 CONFIGURAZIONE DEL COMANDO
handler.command = /^(hidetag|tag)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;