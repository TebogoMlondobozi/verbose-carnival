const env = process.env.NODE_ENV || "dev";

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
    host: process.env.DEV_APP_HOST || "127.0.0.1",
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || "eazywash-db",
    url: process.env.DE_DB_URL || "mongodb://127.0.0.1:27017/eazywash-db",
  },
  emailService: {
    service: process.env.DEV_EMAIL_SERVICE || "",
    auth: {
      user: process.env.AUTH_EMAIL_ADDRESS || "",
      pass: process.env.AUTH_PASSWORD || "",
    },
    campaignEmail: {
      email: process.env.DEV_CAMPAIGN_EMAIL || "",
    },
  },
};

const config = () =>
  ({
    dev,
  }[env]);

module.exports = config;
