const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;

        const msg = m.message.conversation || m.message.extendedTextMessage?.text;
        const from = m.key.remoteJid;

        if (msg === ".menu") {
            await sock.sendMessage(from, { text: "🤖 NOVA FX-BOT ONLINE\nCommands:\n.menu\n.vv" });
        }

        if (msg === ".vv") {
            await sock.sendMessage(from, { text: "👀 VV command active" });
        }
    });
}

startBot();
