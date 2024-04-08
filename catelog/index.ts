import Category from "./category";
import Product from "./product";
import { Tag } from "./tag";

const cakeURLCategory = new Category("/cake", "Cakes", "url");
const giftURLCategory = new Category("/gift", "Gifts", "url");
const cakeDiwaliCategory = new Category("/cake/diwali", "Diwali Cakes", "url");
const giftDubaiURLCategory = new Category("/gift/dubai", "Gifts", "url");
const cakeTag = new Tag("cake", "product_type");
const giftTag = new Tag("gift", "product_type");
const diwaliTag = new Tag("diwali", "occasion");
const dubaiTag = new Tag("dubai", "city");

const cakeProduct1 = new Product("CAKE001", "Chocolate Cake", "A delicious chocolate cake", "cake", false, false);
cakeProduct1.addTag(cakeTag);
cakeProduct1.addTag(diwaliTag);
cakeProduct1.addTag(dubaiTag);

const cakeProduct2 = new Product("CAKE002", "Vanila Cake", "A delicious Vanila cake", "cake", false, false);
cakeProduct2.addTag(cakeTag);
cakeProduct2.addTag(dubaiTag);

const giftProduct1 = new Product("GIFT001", "Flower Bouquet", "A beautiful flower bouquet", "gift", false, false);
giftProduct1.addTag(giftTag);
giftProduct1.addTag(diwaliTag);

const giftProduct2 = new Product("GIFT002", "Teddy Bear", "A cute teddy bear", "gift", false, false);
giftProduct2.addTag(giftTag);
giftProduct2.addTag(dubaiTag);

const personalizedProduct1 = new Product(
  "PERSONALIZED001",
  "Personalized Mug",
  "A personalized mug",
  "personalized",
  false,
  false
);

personalizedProduct1.addTag(giftTag);
personalizedProduct1.addTag(dubaiTag);

const personalizedProduct2 = new Product(
  "PERSONALIZED002",
  "Personalized T-Shirt",
  "A personalized T-Shirt",
  "personalized",
  false,
  false
);
personalizedProduct1.addTag(giftTag);
personalizedProduct1.addTag(diwaliTag);

const cakeVariant201 = new Product("CAKE201", "Rainbow Cake", "A variant cake", "cake", true, false);
cakeVariant201.addTag(cakeTag);

const cake4piece = new Product("CAKE202", "4 Rainbow piece cake", "A 4 Rainbow piece cake", "cake", false, true);
cake4piece.addTag(cakeTag);
cakeVariant201.addVariant(cake4piece);

const cake8piece = new Product("CAKE203", "8 Rainbow piece cake", "A 8 Rainbow piece cake", "cake", false, true);
cake8piece.addTag(cakeTag);
cakeVariant201.addVariant(cake8piece);

const cake12piece = new Product("CAKE204", "12 Rainbow piece cake", "A 12 Rainbow piece cake", "cake", false, true);
cake12piece.addTag(cakeTag);
cakeVariant201.addVariant(cake12piece);

const productList = [
  cakeProduct1,
  cakeProduct2,
  giftProduct1,
  giftProduct2,
  personalizedProduct1,
  personalizedProduct2,
  cakeVariant201,
  cake4piece,
  cake8piece,
  cake12piece,
];

const populateCategory = async (category: Category) => {
  console.log("category", category);
  const segments = category.id.split("/");

  // find all products which have the tag same as the segment
  const filteredSegments = segments.filter((segment) => segment !== "");
  console.log("segments", filteredSegments);
  const catProducts = filterProductsByTag(productList, filteredSegments);
  //   console.log("catProducts", catProducts);
  catProducts.forEach((product) => {
    console.log("adding product to category", product.id, category.id);
    category.addProduct(product, 1);
  });
};

const filterProductsByTag = (productList: Product[], inputTag: string[]) => {
  return productList.filter((product) => {
    if (product.isVariant) {
    } else {
      // return products which have all input tags
      return inputTag.every((tag) => {
        return product.tags.some((productTag) => productTag.name === tag);
      });
    }
  });
};

// populateCategory(cakeDiwaliCategory);

// populateCategory(cakeURLCategory);

populateCategory(giftDubaiURLCategory);
