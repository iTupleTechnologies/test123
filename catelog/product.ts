import { city, ShippingMethod, Slot, Supplier } from "../shipment/slots";
import { Tag } from "./tag";

export default class Product {
  id: string;
  productType: product_type;
  name: string;
  description: string;
  price: price[] = [] as price[];
  isVirtual: boolean;
  isVariant: boolean;
  variants: Product[] = [];
  tags: Tag[] = [];
  suppliers: Supplier[] = [];
  addOns: Product[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    type: product_type,
    isVirtual: boolean = false,
    isVariant: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.productType = type;
    this.isVirtual = isVirtual;
    this.isVariant = isVariant;
  }

  addTag(tag: Tag) {
    this.tags.push(tag);
  }

  addPrice(price: price) {
    if (this.price === undefined) this.price = [];
    // if same price type already exists then update it
    for (let i = 0; i < this.price.length; i++) {
      if (this.price[i].type === price.type) {
        this.price[i] = price;
        return;
      }
    }

    this.price.push(price);
  }

  addSupplier(supplier: Supplier) {
    this.suppliers.push(supplier);
  }

  addVariant(variant: Product) {
    if (!this.isVariant) {
      this.variants.push(variant);
    } else {
      throw Error("Cannot add variant to a variant product");
    }
  }

  getShippingMethodsByCity(city: city) {
    let shippingMethods: ShippingMethod[] = [];
    for (let supplier of this.suppliers) {
      let supplierShippingMethods = supplier.getShippingMethods(city);
      if (!supplierShippingMethods) continue;
      for (let shippingMethod of supplierShippingMethods) {
        if (!shippingMethods.includes(shippingMethod)) shippingMethods.push(shippingMethod);
      }
    }
    return shippingMethods;
  }

  getSlotsByShippingMethodName(city: city, shippingMethodName: string) {
    let shippingMethods = this.getShippingMethodsByCity(city);
    let slots: Slot[] = [];
    for (let shippingMethod of shippingMethods) {
      if (shippingMethod.name === shippingMethodName) {
        slots = slots.concat(shippingMethod.slots);
      }
    }
    return slots;
  }
}

type price = {
  type: price_type;
  amount: number;
  taxPercent: number;
};

type price_type = "List" | "Sale";

type product_type = "cake" | "gift" | "personalized" | "combo" | "subscription" | "addon";

export { product_type, price_type };
