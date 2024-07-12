const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

class Trades extends Model {}

Trades.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  sequelize, // Passing the `sequelize` instance is required
  modelName: 'Trade', // We need to choose the model name
  timestamps: false, // We don't need createdAt and updatedAt fields
  tableName: 'trades' // Optionally specify the table name
});

module.exports = Trades;
