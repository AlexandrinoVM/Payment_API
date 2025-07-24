
import { ProductService } from "../models/productService";

async function seedProducts() {
    await ProductService.bulkCreate([
        {
        name: 'Plano Básico Mensal',
        description: 'Acesso básico a serviços com suporte limitado.',
        price: 49.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Plano Premium Mensal',
        description: 'Acesso completo a todos os recursos e suporte 24h.',
        price: 99.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Consulta Técnica',
        description: 'Serviço avulso de consultoria técnica especializada.',
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manutenção Preventiva',
        description: 'Serviço de manutenção preventiva anual.',
        price: 299.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ],{
        ignoreDuplicates: true, 
    })
    console.log('Products seeded successfully');

}

export default seedProducts;