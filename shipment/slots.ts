import Product from "../catelog/product";

class Slot {
  key: string;
  start: number;
  end: number;

  constructor(start: number, end: number) {
    if (start < 0 || start >= 24 || end < 0 || end >= 24) throw `Invalid slot range: ${start}-${end}`;
    this.start = start;
    this.end = end;

    this.key = this.getKey();
  }

  getKey() {
    return String(this.start).padStart(2, "0") + "-" + String(this.end).padStart(2, "0");
  }

  toString() {
    return this.key;
  }
}

// const slot: Slot = new Slot(23, 0);
// console.log(slot.toString());
class ShippingMethod {
  name: string;
  slots: Slot[] = [];

  constructor(name: string, slots: Slot[]) {
    this.name = name;
    this.addSlots(slots);
  }

  addSlot(slot: Slot) {
    // check if slot overlaps with existing slots
    // for (let existingSlot of this.slots) {
    //   if (slot.start >= existingSlot.start && slot.start <= existingSlot.end) {
    //     throw `Slot ${slot.toString()} overlaps with existing slot ${existingSlot.toString()}`;
    //   }
    //   if (slot.end >= existingSlot.start && slot.end <= existingSlot.end) {
    //     throw `Slot ${slot.toString()} overlaps with existing slot ${existingSlot.toString()}`;
    //   }
    // }
    this.slots.push(slot);
  }

  addSlots(slots: Slot[]) {
    for (let slot of slots) {
      this.addSlot(slot);
    }
  }
}

type city = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Fujairah" | "Ras Al Khaimah" | "Umm Al Quwain";
type cityShippingMethods = { [key in city]: ShippingMethod[] };
class Supplier {
  name: string;
  cityShippingMethods: cityShippingMethods;
  //   cities: cities[] = [];
  //   shippingMethods: ShippingMethod[] = [];

  constructor(name: string) {
    this.name = name;
    this.cityShippingMethods = {} as cityShippingMethods;
  }
  addShippingMethod(city: city, shippingMethod: ShippingMethod) {
    if (!this.cityShippingMethods[city]) {
      this.cityShippingMethods[city] = [];
    }
    this.cityShippingMethods[city].push(shippingMethod);
  }

  getShippingMethods(city: city) {
    return this.cityShippingMethods[city];
  }
}

// class Product {
//   name: string;
//   suppliers: Supplier[] = [];

//   constructor(name: string, suppliers: Supplier[]) {
//     this.name = name;
//     this.suppliers = suppliers;
//   }

//   addSupplier(supplier: Supplier) {
//     this.suppliers.push(supplier);
//   }

//   getShippingMethodsByCity(city: city) {
//     let shippingMethods: ShippingMethod[] = [];
//     for (let supplier of this.suppliers) {
//       let supplierShippingMethods = supplier.getShippingMethods(city);
//       if (!supplierShippingMethods) continue;
//       for (let shippingMethod of supplierShippingMethods) {
//         if (!shippingMethods.includes(shippingMethod)) shippingMethods.push(shippingMethod);
//       }
//     }
//     return shippingMethods;
//   }

//   getSlotsByShippingMethodName(city: city, shippingMethodName: string) {
//     let shippingMethods = this.getShippingMethodsByCity(city);
//     let slots: Slot[] = [];
//     for (let shippingMethod of shippingMethods) {
//       if (shippingMethod.name === shippingMethodName) {
//         slots = slots.concat(shippingMethod.slots);
//       }
//     }
//     return slots;
//   }
// }

export { Slot, ShippingMethod, Supplier, city };

// Create Sample data for testing
// Express Slots
const slot1: Slot = new Slot(8, 9);
const slot2: Slot = new Slot(9, 10);
const slot21: Slot = new Slot(10, 11);
const slot22: Slot = new Slot(11, 12);
// morning slot
const slot3: Slot = new Slot(6, 9);

// standard slots
const slot4: Slot = new Slot(9, 12);
const slot5: Slot = new Slot(12, 15);
const slot6: Slot = new Slot(15, 18);
const slot7: Slot = new Slot(18, 21);
// Midnight slot
const slot8: Slot = new Slot(23, 0);

const expressShippingMethod: ShippingMethod = new ShippingMethod("Express", [slot1, slot2, slot21, slot22]);
const standardShippingMethod: ShippingMethod = new ShippingMethod("Standard", [slot4, slot5, slot6, slot7]);
const midnightShippingMethod: ShippingMethod = new ShippingMethod("Midnight", [slot8]);
const morningShippingMethod: ShippingMethod = new ShippingMethod("Morning", [slot3]);

const supplier1: Supplier = new Supplier("Express Supplier");
supplier1.addShippingMethod("Dubai", expressShippingMethod);
supplier1.addShippingMethod("Abu Dhabi", expressShippingMethod);
supplier1.addShippingMethod("Sharjah", expressShippingMethod);
supplier1.addShippingMethod("Dubai", standardShippingMethod);
const supplier2: Supplier = new Supplier("Standard Supplier");
supplier2.addShippingMethod("Dubai", standardShippingMethod);
supplier2.addShippingMethod("Abu Dhabi", standardShippingMethod);
supplier2.addShippingMethod("Sharjah", standardShippingMethod);
const supplier3: Supplier = new Supplier("Midnight Supplier");
supplier3.addShippingMethod("Dubai", midnightShippingMethod);
supplier3.addShippingMethod("Abu Dhabi", midnightShippingMethod);
supplier3.addShippingMethod("Sharjah", midnightShippingMethod);

// const product1: Product = new Product("DB Shoes", [supplier1, supplier2, supplier3]);
// console.log("Shipping methods for product", product1.name, product1.getShippingMethodsByCity("Dubai"));
// console.log("Slots for ", product1.name, product1.getSlotsByShippingMethodName("Dubai", "Standard"));

// const product2: Product = new Product("DB Shirts", [supplier1, supplier2]);
// console.log("Shipping methods for product", product2.name, product2.getShippingMethodsByCity("Fujairah"));

// const product2: Product = new Product("DB Shirt", [supplier1, supplier2]);
// console.log(product2.getShippingMethods());
// console.log(product2.getSlotsByShippingMethodName("Midnight"));
