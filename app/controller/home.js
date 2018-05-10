const { Controller } = require('egg');

/**
 * 主页Controller
 *
 * @class Home
 * @extends {Controller}
 */
class Home extends Controller {
  /**
   * 首页渲染
   *
   * @memberof Home
   * @return {promise} 渲染的首页
   */
  async index() {
    const { ctx } = this;

    await ctx.render('index.html');
  }
}

module.exports = Home;
