exports.sequelize = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'pofa_client',
  benchmark: true,
  define: {
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  },
};
