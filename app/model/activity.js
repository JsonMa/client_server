module.exports = (app) => {
  const {
    UUID, UUIDV1, STRING, ENUM, ARRAY, JSONB, DATE,
  } = app.Sequelize;

  /**
   * 活动Model
   *
   * @model Activity
   * @namespace Model
   *
   * @property {uuid}    id
   * @property {string}  name           - 活动名
   * @property {string}  description    - 活动描述
   * @property {string}  address        - 活动地址
   * @property {string}  phone          - 活动联系人
   * @property {array}   picture_ids    - 活动图ids
   * @property {time}    time           - 活动时间
   * @property {enum}    status         - 活动状态['ON', 'OFF']
   */
  const Activity = app.model.define('activity', {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
    },
    name: {
      type: STRING(20),
      allowNull: false,
    },
    description: {
      type: STRING(20),
      allowNull: true,
    },
    address: {
      type: JSONB,
      allowNull: true,
    },
    phone: {
      type: STRING(32),
      allowNull: true,
    },
    picture_ids: {
      type: ARRAY(UUID),
      allowNull: true,
      defaultValue: [],
    },
    time: {
      type: DATE,
      allowNull: false,
    },
    status: {
      type: ENUM,
      values: ['ON', 'OFF'],
      defaultValue: 'ON',
      allowNull: false,
    },
  });

  return Activity;
};
