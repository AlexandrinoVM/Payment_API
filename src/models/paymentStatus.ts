import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class PaymentStatus extends Model {
  public id!: number;
  public status!: string;
  public description!: string;
}

PaymentStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'payment_status',
  }
);