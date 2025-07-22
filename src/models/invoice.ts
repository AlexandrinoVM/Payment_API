import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Invoice extends Model {
  public id!: number;
  public paymentOrderId!: number;
  public amount!: number;
  public dueDate!: Date;
}

Invoice.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'invoices',
  }
);