import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'database',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    }
})

// Import all models to ensure they are registered with Sequelize
import '../models/user'
import '../models/paymentOrder'
import '../models/invoice'
import '../models/transactionLog'
import '../models/refund'
import '../models/paymentStatus'
import '../models/productService'