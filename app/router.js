// @ts-nocheck

/**
 * @param {Egg.Application} app - egg application
 * @return {null} 无返回
 */
module.exports = (app) => {
  const prefix = app.config.noPrefix ? '' : '/api/v1';

  // home page
  app.get('/', 'home.index');

  // activity
  app.get(`${prefix}/activity`, 'activity.index');
  app.get(`${prefix}/activitys/:id`, 'activity.fetch');
  app.post(`${prefix}/activitys`, 'activity.create');

  // user
  app.post(`${prefix}/users`, 'user.create');
  app.post(`${prefix}/users/send_email`, 'user.emit');
};
