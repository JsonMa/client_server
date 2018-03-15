module.exports = (app) => {
  const {
    UUID, UUIDV1, STRING, ENUM, JSONB,
  } = app.Sequelize;

  /**
   * 用户Model
   *
   * @model User
   * @namespace Model
   *
   * @property {string}    id
   * @property {string}    name           - 用户名
   * @property {string}    address        - 用户地址
   * @property {string}    phone          - 联系电话
   * @property {string}    avatar_id      - 用户头像
   * @property {string}    email          - 用户邮箱
   * @property {string}    status         - 用户状态['ON', 'OFF']
   * @property {string}    role           - 用户角色[1,2]分别代表系统管理员、普通用户
   * @property {string}    password       - 密码,md5加密后的值
   */
  const User = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
    },
    name: {
      type: STRING(20),
      allowNull: true,
    },
    address: {
      type: JSONB,
      allowNull: true,
    },
    email: {
      type: STRING(64),
      allowNull: false,
    },
    phone: {
      type: STRING(32),
      allowNull: true,
    },
    password: {
      type: STRING(64),
      allowNull: false,
    },
    avatar_id: {
      type: UUID,
      allowNull: true,
    },
    status: {
      type: ENUM,
      values: ['ON', 'OFF'],
      defaultValue: 'ON',
      allowNull: false,
    },
    role: {
      type: ENUM,
      values: ['1', '2'],
      defaultValue: '2',
      allowNull: false,
    },
  });

  return User;
};
