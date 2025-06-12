const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUs0SnJsREEvczNsRjZKMW1DemJwTWlTVFJ0Yk1IMlZQa2NuVTk5QTdIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3pXMlVyekJKNGxvVFd6RFlyenBPeFByNFNhMHJvQ3FjQjlNanhSYWx3ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTzVtc3JEVkMvdndZQnNsSGNOdnRZdE5hcjdFT2xJTGI3MXdENmVJSW1vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3VDBDaEYvbjMwcGMyVG5wYUc2UThyY3dtU0JWVGFCc3ZFWEJMdlNleUcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllOR2gwRlFVZ25zY0RBWTJGZTFlQXY4M3RYZkZzRFN2ZjRBYTRXRE56R2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFWNDhMa2lMTDJLeFdlb285Ti93eU1DaHZQWmFjb2pmc3RJNi9YclEwREE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0g4d2daWnhHZ292MVNhSUs0Mk5hbVRDaEJNUmZ2VWZpdjNrblFkeVozdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXVPMDAyMUZsTFcvWk8wQVdiTzdZaWpYeVUwV1BYVHNQRit3SzZsb1BDWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt0WEQ2U2hwNFRIZXRXaWZVeFlyejZuUE9QWmhVdXlURXFuWWN2SXNDTGFib1FTZFhTM21wbVpubDF3U1hua0l2cmV1QnpvUUl5S1BRQjlmWDhNNEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU3LCJhZHZTZWNyZXRLZXkiOiIzMVJPUDB2SnRuZmVtMUp1NjU1RmNlTmVMcVE5a2h5d2tPVTMzMDdGWEQ0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjEyMTM2MDYxNzY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBREYxNDAzRTg1RTUzQkU4OEZDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk2NTIwODV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjEyMTM2MDYxNzY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQjREMkZFODFBNzFGQTk0RTA3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk2NTIwOTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjEyMTM2MDYxNzY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMEFBNjdFRDEwOUFFMzA5MERCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk2NTIxMDd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkJQMk02RVJOIiwibWUiOnsiaWQiOiIxMjEzNjA2MTc2NTo4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQ3NTYyNTM1NzE1MDI1OjhAbGlkIiwibmFtZSI6In7hoZXhoLXhoIrhoYPgu4jgoZrgoKLgoJjiuJ3gu4jgoKHhoIrfr+GhgeCgo+CgmOGgiuGgiuCgouCgmOawlOS6oE1vReGhleGgteGgiuGhg+C7iOChmuCgouCgmOK4neC7iOCgoeGgit+v4aGB4KCj4KCY4aCK4aCK4KCi4KCY5rCU5LqgIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOQ3Q3cXNDRU9Da3BzSUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiOHpNVXNUSVc3Z1hTWVNxR0pBSERUZ0ZKYXZmdVE3ZWJHd3VTakdneFNZPSIsImFjY291bnRTaWduYXR1cmUiOiJzOHVaTitCREE1L3BPck85TDNjcVM1RFhRRVI4RFhlYUFrQ1phcnY2RlgzTXd2SFpMSnlJenlwcldleW1jVVlxcW9jZ0FURi94Nk02ZzVJMDdIR05BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVCsyMkxMYVNIN0dxZ1UrWjJxM2xQYTE2YlAwdlM1SThrU2txc0MwTm9KTWNBVjJpQUh1RDVXOTJjb3c5T3FVbTZ1aEQzbXNjODZCSGNuYU1ZOTRuRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxMjEzNjA2MTc2NTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlcvTXpGTEV5RnU0RjBtRXFoaVFCdzA0QlNXcjM3a08zbXhzTGtveG9NVW0ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTY1MjA3NywibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJYjAifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 12136061765",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

