'use strict';

const mineflayer = require('mineflayer');
const config = require('./settings.json');

console.log('='.repeat(50));
console.log('  DEBUG MODE - Detailed Connection Logging');
console.log('='.repeat(50));
console.log(`Server: ${config.server.ip}:${config.server.port}`);
console.log(`Version: ${config.server.version}`);
console.log(`Username: ${config['bot-account'].username}`);
console.log('='.repeat(50));

const bot = mineflayer.createBot({
  username: config['bot-account'].username,
  password: config['bot-account'].password || undefined,
  auth: config['bot-account'].type,
  host: config.server.ip,
  port: config.server.port,
  version: config.server.version || false,
  hideErrors: false
});

bot.on('login', () => {
  console.log('[DEBUG] ✓ LOGIN event received');
});

bot.on('spawn', () => {
  console.log('[DEBUG] ✓ SPAWN event received - BOT IS IN GAME!');
  console.log(`[DEBUG] Position: ${bot.entity.position}`);
  console.log(`[DEBUG] Health: ${bot.health}`);
});

bot.on('kicked', (reason) => {
  console.log('[DEBUG] ✗ KICKED:', JSON.stringify(reason, null, 2));
});

bot.on('error', (err) => {
  console.log('[DEBUG] ✗ ERROR:', err.message);
  console.log('[DEBUG] Stack:', err.stack);
});

bot.on('end', (reason) => {
  console.log('[DEBUG] ✗ DISCONNECTED:', reason);
  process.exit(1);
});

bot.on('messagestr', (message) => {
  console.log('[DEBUG] Chat:', message);
});

// Timeout after 60 seconds
setTimeout(() => {
  console.log('[DEBUG] ✗ TIMEOUT - No spawn after 60 seconds');
  console.log('[DEBUG] Bot state:', {
    username: bot.username,
    version: bot.version,
    protocolVersion: bot.protocolVersion
  });
  process.exit(1);
}, 60000);

console.log('[DEBUG] Bot created, attempting connection...');
