const validateRule = require('./helper/rule');

module.exports = {
  rule: validateRule,
  ajv: require('./helper/ajv'),
  preprocessor: require('./helper/preprocessor'),
  assert: require('assert'),
  mailer: require('./helper/mailer'),
  uuidValidate: uuid => new RegExp(validateRule.uuidRegrex).test(uuid),
};
