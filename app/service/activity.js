// @ts-nocheck
const {
  Service,
} = require('egg');

/**
 * Activity Service
 *
 * @class ActivityService
 * @extends {Service}
 */
class ActivityService extends Service {
  /**
   * 根据ids查找活动
   *
   * @param {array} ids 活动id数组
   * @memberof ActivityService
   * @returns {object} 活动数组
   */
  findByIds(ids) {
    const { assert } = this.ctx.helper;
    assert(ids instanceof Array, 'ids需为数组');

    return this.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
      attributes: ['id', 'name', 'nickname', 'avatar'],
    });
  }

  /**
     *  验证活动是否存在
     *
     * @param {string} name -活动名称
     * @memberof ActivityService
     * @returns {promise} 返回验证结果
     */
  isExisted(name) {
    const { assert } = this.ctx.helper;
    assert(typeof name === 'string', 'name需为字符串');

    return this.app.model.Activity.find({
      where: {
        name,
      },
    }).then((activity) => {
      this.ctx.error(!activity, '活动已存在', 20003);
    });
  }

  /**
   * 获取活动详情
   *
   * @param {string} id -活动ID
   * @memberof ActivityService
   * @returns {promise} 返回活动详情
   */
  getByIdOrThrow(id) {
    const { assert, uuidValidate } = this.ctx.helper;
    assert(uuidValidate(id), 'id需为uuid格式');

    return this.app.model.Activity.findById(id).then((activity) => {
      this.ctx.error(activity, '活动不存在', 20004);
      return activity;
    });
  }
}

module.exports = ActivityService;
