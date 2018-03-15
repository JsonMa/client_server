// @ts-nocheck
const { Controller } = require('egg');
const crypto = require('crypto');

/**
 * 用户Controller
 *
 * @class User
 * @extends {Controller}
 */
class User extends Controller {
  /**
   * 增加用户-参数验证
   *
   * @readonly
   * @memberof User
   */
  get createRule() {
    return {
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
      },
      required: ['email'],
      $async: true,
      additionalProperties: false,
    };
  }
  /**
   * 新增用户
   *
   * @memberof User
   * @return {promise} 新增的用户
   */
  async create() {
    const { ctx, createRule } = this;
    const { email } = await ctx.validate(createRule);

    const md5 = crypto.createHash('md5');
    const ecptPassword = md5.update('email').digest('hex');
    const user = await ctx.app.model.User.create({
      email,
      password: ecptPassword,
    });
    ctx.jsonBody = user;
  }

  /**
   * 用户详情
   *
   * @memberof User
   * @return {promise} 用户详情
   */
  async fetch() {
    // TODO
    const { ctx } = this;

    ctx.jsonBody = {
      data: 'fetch user',
    };
  }

  /**
   * 邮件发送-参数验证
   *
   * @readonly
   * @memberof User
   */
  get emitRule() {
    return {
      properties: {
        ids: {
          type: 'array',
          item: this.ctx.helper.rule.uuid,
        },
        emails: {
          type: 'array',
          item: {
            type: 'string',
            format: 'email',
          },
        },
      },
      required: [],
      $async: true,
      additionalProperties: false,
    };
  }

  /**
   * 发送邮件
   *
   * @memberof User
   * @return {promise} 发动的邮件
   */
  async emit() {
    const { ctx, emitRule } = this;
    const { ids, emails } = await ctx.validate(emitRule);
    let users = emails;

    if (ids.length !== 0) users = await ctx.service.findByIds(ids);
    else {
      users = await ctx.app.model.User.findAll({
        where: {
          status: 'ON',
          role: '2',
        },
      });
    }
    users.forEach((user) => {
      // TODO
    });

    ctx.jsonBody = users;
  }
}

module.exports = User;
