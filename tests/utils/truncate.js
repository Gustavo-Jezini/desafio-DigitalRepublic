const { sequelize } = require('../../models');

module.exports = () => {
  return Promise.all(Object.keys(sequelize.models).map(key => {
    return sequelize.models[key].destroy({ truncate: true, force: true });
  })).catch(e => console.log(e))
}