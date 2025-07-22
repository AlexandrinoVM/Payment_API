import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class TransactionLog extends Model {
  public id!: number;
  public paymentOrderId!: number;
  public transactionId!: string;
  public timestamp!: Date;
}

TransactionLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    paymentOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'transaction_logs',
  }
);