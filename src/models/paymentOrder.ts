import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { PaymentStatus } from './paymentStatus';


enum PaymentOrderStatus {
  PENDING = 'pending',
  COMPLETED = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

enum paymentMethodEnum{
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTOCURRENCY = 'cryptocurrency',
  CASH = 'cash',
  PIX = 'pix',
}

export class PaymentOrder extends Model {
  public id!: number;
  public userId!: number;
  public amount: number;
  public paymentMethod: paymentMethodEnum;
  public paymentStatusId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PaymentOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'payment_status',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    tableName: 'payment_orders',
  }
);

PaymentOrder.belongsTo(PaymentStatus,{foreignKey: 'paymentStatus'});