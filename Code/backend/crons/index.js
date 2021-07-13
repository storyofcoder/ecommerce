
let cron = require('node-cron');

// Run every day
cron.schedule('0 0 */1 * *', async () => {
});
