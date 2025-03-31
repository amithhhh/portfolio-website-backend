import axios from "axios";

export const sendTelegramNotification = async (message) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    console.log("Bot Token:", process.env.TELEGRAM_BOT_TOKEN);
    console.log("Chat ID:", process.env.TELEGRAM_CHAT_ID);

    const text = `📩 *New Message Received:*\n\n👤 Name: ${message.name}\n📧 Email: ${message.email}\n📝 Subject: ${message.subject}\n💬 Message: ${message.message}`;


    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    try {
        await axios.post(url, {
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown"
        });
    } catch (error) {
        console.error("Error sending Telegram notification:", 
            error.response?.data || error.message
        );
    }
    
}