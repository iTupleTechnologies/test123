import Product from "./product";

export default class Category {
  desc: string;
  id: string;
  type: "url" | "standard";
  productsWithSequence: { sequence: number; product: Product }[] = [];

  constructor(id: string, desc: string, type: "url" | "standard") {
    this.id = id;
    this.desc = desc;
    this.type = type;
  }

  addProduct(product: Product, sequence: number) {
    this.productsWithSequence.push({ sequence, product });
  }

  getProducts() {
    const seqProducts = this.productsWithSequence.sort((a, b) => a.sequence - b.sequence);
    return seqProducts.map((seqProduct) => seqProduct.product);
  }

  // make a method to change sequence of a product and move the sequence of all other products accordingly
  changeProductSequence(product: Product, newSequence: number) {
    const seqProduct = this.productsWithSequence.find((seqProduct) => seqProduct.product.id === product.id);
    const existingProductAtSeq = this.productsWithSequence.find((seqProduct) => seqProduct.sequence === newSequence);
    if (!seqProduct) {
      throw Error("Product not found in category");
    }
    if (existingProductAtSeq) {
      seqProduct.sequence = newSequence;
      this.changeProductSequence(existingProductAtSeq.product, newSequence + 1);
    } else {
      seqProduct.sequence = newSequence;
    }
  }
}
