const handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, "⚠️ Devi scrivere un messaggio dopo il comando!", m);

    const broadcastMessage = `📢 *Messaggio Podcast:*\n\n${text.trim()}`;
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    let sentCount = 0;
    let failedGroups = [];

    for (const group of groups) {
        try {
            const metadata = await conn.groupMetadata(group);
            const botParticipant = metadata.participants.find(p => p.id === conn.user.jid);
            const isAdmin = botParticipant && botParticipant.admin;

            if (isAdmin) {
                // Ottieni gli ID di tutti i membri del gruppo per hidetag
                const participants = metadata.participants.map(p => p.id);
                await conn.sendMessage(group, { 
                    text: broadcastMessage, 
                    mentions: participants  // Utilizza hidetag
                });
                sentCount++;
                await new Promise(resolve => setTimeout(resolve, 5000)); // Aspetta 5 secondi tra gli invii
            } else {
                failedGroups.push(metadata.subject); // Salva i gruppi in cui non è admin
            }
        } catch (err) {
            failedGroups.push(group);
        }
    }

    let response = `✅ Messaggio inviato con successo a *${sentCount}* gruppi!`;
    if (failedGroups.length > 0) {
        response += `\n⚠️ Non inviato in ${failedGroups.length} gruppi (bot non admin):\n${failedGroups.join("\n")}`;
    }

    await conn.reply(m.chat, response, m);
};

// Impostiamo il comando e chi può usarlo
handler.command = /^(podcast)$/i;
handler.owner = true;

export default handler;