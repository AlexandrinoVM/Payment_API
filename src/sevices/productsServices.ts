import { ProductService } from "../models/productService";

export class productsServices{
    static async getAllProducts(ids: number[]): Promise<any> {
        try {
            const products = await ProductService.findAll({
                where: {
                    id: ids
                }
            });
            return products;
        }catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }

    }
}