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
    const { mailer } = ctx.app.config;
    const code = Date.now();

    // 发送验证邮件
    const resp = await ctx.helper.mailer.send(mailer, {
      to: email,
      subject: 'bankerchain verification',
      html: `<p>Weclome to subscribe to bankerchain's official mail, please click <a href="http://bankerchain.tech/users/confrim?validateCode=${code}&email=${email}">here</a> to confirm.</p>`,
    });
    await this.app.redis.set(email, code);
    ctx.jsonBody = resp;
  }

  /**
   * 参数验证-邮件确认
   *
   * @readonly
   * @memberof User
   */
  get confirmRule() {
    return {
      properties: {
        validateCode: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
      required: ['validateCode', 'email'],
      $async: true,
      additionalProperties: false,
    };
  }

  /**
   * 邮件确认
   *
   * @memberof User
   * @return {promise} 确认邮件
   */
  async confirm() {
    const { ctx, confirmRule } = this;

    const { validateCode, email } = await ctx.validate(confirmRule);
    const code = await this.app.redis.get(email);

    if (validateCode === code) {
      const md5 = crypto.createHash('md5');
      const ecptPassword = md5.update(email).digest('hex');
      await ctx.app.model.User.create({
        email,
        password: ecptPassword,
      });
      ctx.redirect('http://http://bankerchain.tech');
    } else ctx.jsonBody = { error: '验证码错误' };
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
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
      },
      required: ['title', 'content'],
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
    const {
      ids, emails, title, content,
    } = await ctx.validate(emitRule);
    let users = emails; // 默认为所有用户邮件
    const { mailer } = ctx.app.config;

    if (ids && ids.length !== 0) users = await ctx.service.findByIds(ids);
    else {
      users = await ctx.app.model.User.findAll({
        where: {
          email: {
            $in: emails,
          },
          status: 'ON',
          role: '2',
        },
      });
    }

    const emailArray = users.map(user => user.email);
    const resp = await ctx.helper.mailer.send(mailer, {
      to: emailArray,
      subject: title,
      html: `<div>${content}</div>`,
    });

    ctx.jsonBody = resp;
  }
}

module.exports = User;
