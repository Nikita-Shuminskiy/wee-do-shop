import {ProductCartType} from "../store/CartStore/cart-store";

export const updateValueCartProducts = (products: ProductCartType[], productValue, productId): ProductCartType[] => {
    return products.map((product) => {
        if (product._id === productId) {
            return {
                ...product,
                productValue: productValue,
            };
        }
        return product;
    });

}

export const getTotalSumProductsCart = (products: ProductCartType[]): number => {
   return products.reduce(
        (sum, product) => sum + product.productValue * product.price,
        0
    );
}
