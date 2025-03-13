const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let owners = ["393445461546", "393272790038", "27620870446", "19709001746"]; // Numeri degli owner autorizzati

let handler = async (m, { conn, args }) => {
    let senderNumber = m.sender.split('@')[0];

    // Controllo se l'utente è un owner autorizzato
    if (!owners.includes(senderNumber)) {
        return conn.reply(m.chat, "❌ *Solo gli owner possono usare questo comando!*", m);
    }

    if (!args[0]) {
        return conn.reply(m.chat, "❌ *Devi fornire un link di invito valido!*\n\nEsempio: *.join https://chat.whatsapp.com/xxxxxxxxxxxxxxxxxxxxxx*", m);
    }

    let inviteLink = args[0];
    let regex = /chat\.whatsapp\.com\/([0-9A-Za-z]+)/;
    let match = inviteLink.match(regex);

    if (!match) {
        return conn.reply(m.chat, "❌ *Il link fornito non è valido!*", m);
    }

    let code = match[1];

    // Reazione di caricamento
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    await delay(2000);

    try {
        await conn.groupAcceptInvite(code);

        // Embed di conferma
        let messageText = `🎉 *Sono entrato con successo nel gruppo!*\n\n🔗 *Link:* ${inviteLink}\n👑 *Azione eseguita da:* @${senderNumber}`;
        
        await conn.sendMessage(m.chat, {
            text: messageText,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "🔹 Invito Accettato 🔹",
                    body: "Il bot è entrato nel gruppo con successo!",
                    thumbnailUrl: "https://i.imgur.com/T4NjF1V.png", // Immagine personalizzabile
                    sourceUrl: inviteLink,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        });

        // Reazione di successo
        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.error("Errore nell'unirsi al gruppo:", e);
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        conn.reply(m.chat, "❌ *Errore: non sono riuscito ad entrare nel gruppo!*\n\n🔹 Assicurati che il link sia valido.\n🔹 Il bot potrebbe essere stato bloccato dall'ingresso.", m);
    }
};

// Configurazione dei comandi
handler.command = /^(join)$/i;
handler.owner = true; // Solo gli owner possono usare il comando
handler.group = false;

export default handler;