const config = {
  database: {
    host: process.env.DB_HOST || "service-quotes-mysql",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "service_quotes",
  },
  secret: process.env.APP_SECRET || "5b6331e883a41f929e56c2b04648e30a298bbb543dd9cf21",
};

module.exports = config;
