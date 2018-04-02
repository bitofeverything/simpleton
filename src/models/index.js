import Sequelize from 'sequelize';

console.log(__dirname)

const db = () => {

  const sequelize = new Sequelize('simpleton', null, null, {
    dialect: 'sqlite',
    storage: '../simpleton.sqlite3'
  })


}

export default db;
