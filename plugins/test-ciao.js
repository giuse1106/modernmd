let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, {
      text: 'Ciao! Benvenuto al bot.',
    }, { quoted: m });
  };
  
  handler.command = /^(ciao|salve|hello)$/i;
  handler.group = true; 
  
  export default handler;