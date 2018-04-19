exports.sequelize = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgresql',
  database: 'bkc',
  benchmark: true,
  define: {
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  },
};
