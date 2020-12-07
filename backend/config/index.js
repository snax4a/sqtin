const config = {
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "toor",
    database: process.env.DB_NAME || "mysql-tin",
  },
  secret:
    process.env.APP_SECRET ||
    "5b6331e883a41f929e56c2b04648e30a298bbb543dd9cf21",
};

module.exports = config;
