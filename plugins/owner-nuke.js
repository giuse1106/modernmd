const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn }) => {
    let chatId = m.chat;
    let groupMetadata = await conn.groupMetadata(chatId);
    let participants = groupMetadata.participants;
    let botNumber = conn.user.jid;
    let ownerNumber = "393445461546@s.whatsapp.net"; // ✅ Il tuo numero (NON verrà rimosso)
    let botIsAdmin = participants.some(p => p.id === botNumber && p.admin);
    let spamMessage = "💀 *NUKE ATTIVATO* 💀\n🔥 Questo gruppo verrà eliminato istantaneamente!";

    // 🔴 Controllo permessi
    if (!botIsAdmin) {
        return conn.reply(chatId, "❌ *Il bot deve essere amministratore per eseguire .nuke!*", m);
    }

    try {
        // 🛡️ Rimuove gli admin tranne il bot e il proprietario
        let admins = participants.filter(p => p.admin && p.id !== ownerNumber && p.id !== botNumber);
        for (let admin of admins) {
            await conn.groupParticipantsUpdate(chatId, [admin.id], "demote").catch(() => {});
            await delay(300);
        }

        // 🔒 Imposta chat solo amministratori
        await conn.groupSettingUpdate(chatId, "announcement").catch(() => {});

        // ⏳ Countdown
        for (let i = 3; i > 0; i--) {
            await conn.sendMessage(chatId, { text: `🚨 *ELIMINAZIONE IN ${i} SECONDI* 🚨` });
            await delay(1000);
        }

        // 🔥 Cambia nome e descrizione del gruppo
        await conn.groupUpdateSubject(chatId, "💀 GRUPPO ELIMINATO 💀").catch(() => {});
        await delay(500);
        await conn.groupUpdateDescription(chatId, "🚀 Questo gruppo è stato distrutto da 𝑻𝒉𝒖𝒏𝒅𝒆𝒓ᵇᵒᵗ⚡").catch(() => {});

        // 📢 Spamma il messaggio 5 volte
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(chatId, { text: spamMessage });
            await delay(500);
        }

        // 🚷 Rimuove tutti tranne il proprietario e il bot
        let usersToRemove = participants.filter(p => p.id !== ownerNumber && p.id !== botNumber);
        for (let user of usersToRemove) {
            await conn.groupParticipantsUpdate(chatId, [user.id], "remove").catch(() => {});
            await delay(300);
        }

        // 🚪 Il bot esce dal gruppo
        await conn.sendMessage(chatId, { text: "💀 *MISSIONE COMPLETATA. AUTODISTRUZIONE.* 💀" });
        await delay(1000);
        await conn.groupLeave(chatId).catch(() => {});

    } catch (error) {
        console.error("Errore in .nuke:", error);
        conn.reply(chatId, "❌ Errore durante la procedura di eliminazione!", m);
    }
};

// 📌 Configurazione del comando
handler.command = /^(nuke)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.rowner = true; // Solo il proprietario può usarlo

export default handler;