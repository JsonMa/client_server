// @ts-nocheck
const { Controller } = require('egg');

/**
 * 活动Controller
 *
 * @class Home
 * @extends {Controller}
 */
class Activity extends Controller {
  /**
   * create 参数规则
   *
   * @readonly
   * @memberof Activity
   */
  get createRule() {
    return {
      properties: {
        name: {
          type: 'string',
          maxLength: 128,
          minLength: 0,
        },
        description: {
          type: 'string',
          maxLength: 128,
          minLength: 0,
        },
        address: {
          type: 'string',
          maxLength: 64,
          minLength: 0,
        },
        phone: this.ctx.helper.rule.phone,
        picture_ids: {
          type: 'array',
          items: this.ctx.helper.rule.uuid,
        },
        time: {
          type: 'string',
          format: 'date-time',
        },
      },
      required: ['name', 'time'],
      $async: true,
      additionalProperties: false,
    };
  }

  /**
   * 新增活动
   *
   * @memberof Activity
   * @return {promise} 新增的活动
   */
  async create() {
    const { ctx, createRule, service } = this;
    const { name } = await ctx.validate(createRule);

    // // 验证活动是否存在
    await service.activity.isExisted(name);
    const activity = await ctx.app.model.Activity.create(ctx.request.body);
    ctx.jsonBody = activity;
  }

  /**
   * 获取最新活动
   *
   * @memberof Activity
   * @return {promise} 最新活动
   */
  async index() {
    const { ctx } = this;

    const latest = await ctx.app.model.Activity.findAll({
      where: {
        status: 'ON',
      },
      order: [['time', 'DESC'], ['created_at', 'DESC']],
      limit: 1,
    });
    ctx.jsonBody = latest;
  }

  /**
   * 活动详情-参数规则
   *
   * @readonly
   * @memberof Activity
   */
  get fetchRule() {
    return {
      properties: {
        id: this.ctx.helper.rule.uuid,
      },
      required: ['id'],
      $async: true,
      additionalProperties: false,
    };
  }

  /**
   * 获取活动详情
   *
   * @memberof Activity
   * @return {promise} 活动详情
   */
  async fetch() {
    const { ctx, fetchRule } = this;
    const { id } = await ctx.validate(fetchRule);

    const activity = await ctx.service.activity.getByIdOrThrow(id);
    ctx.jsonBody = activity;
  }

  /**
   * 修改活动内容
   *
   * @readonly
   * @memberof Activity
   */
  get updateRule() {
    return {
      properties: {
        id: this.ctx.helper.rule.uuid,
        status: {
          type: 'string',
          enum: [
            'ON',
            'OFF',
          ],
        },
        time: {
          type: 'string',
          format: 'date-time',
        },
      },
      required: ['status', 'id', 'time'],
      $async: true,
      additionalProperties: false,
    };
  }
  /**
   * 修改活动
   *
   * @memberof Activity
   * @return {promise} 修改的活动
   */
  async update() {
    const { ctx, updateRule } = this;
    const { id } = await ctx.validate(updateRule);

    const activity = await ctx.service.activity.getByIdOrThrow(id);
    Object.assign(activity, ctx.request.body);
    await activity.save();

    ctx.jsonBody = activity;
  }

  /**
   * 删除活动
   *
   * @memberof Activity
   * @return {promise} 删除的活动
   */
  async delete() {
    const { ctx, fetchRule } = this;
    const { id } = await ctx.validate(fetchRule);

    const activity = await ctx.service.activity.getByIdOrThrow(id);
    await activity.destroy();
    ctx.jsonBody = activity;
  }
}

module.exports = Activity;
