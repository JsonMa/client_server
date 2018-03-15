module.exports = (app) => {
  // 同步model至postgresql
  // if (app.config.env === 'local') {
  //   app.beforeStart(function* () {
  //     yield app.model.sync({ force: true });
  //   });
  // }
};
