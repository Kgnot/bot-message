export const getTelegramUrl = () => {
    const token = process.env.TELEGRAM_TOKEN;
    if (!token) {
        throw new Error('TELEGRAM_TOKEN environment variable is not set');
    }
    return `https://api.telegram.org/bot${token}/sendMessage`;
};