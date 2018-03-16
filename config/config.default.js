// @ts-nocheck
module.exports = (appInfo) => {
  const config = exports = {}; // eslint-disable-line

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1521078208927_2371`;
  config.noPrefix = true;

  config.sequelize = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dbuser',
    password: 'client123456',
    database: 'client',
    benchmark: true,
    define: {
      freezeTableName: true,
      underscored: true,
      paranoid: true,
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '',
      db: 0,
    },
  };

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  config.middleware = [
    'error',
    'auth',
  ];

  // email account
  config.mailer = {
    user: 'mahao-0321@hotmail.com',
    pass: 'ainimahao',
    from: 'mahao-0321@hotmail.com',
  };

  return config;
};
