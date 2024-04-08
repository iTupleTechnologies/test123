import Product from "../catelog/product";
import { ShippingMethod, Slot, Supplier } from "./slots";

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

const product2: Product = new Product("GIFT201", "DB Shirt", "Shirt for DB", "gift", false, false);
product2.addSupplier(supplier1);
product2.addSupplier(supplier2);
console.log("shipping methods found", product2.getShippingMethodsByCity("Dubai"));
console.log("available slots found", product2.getSlotsByShippingMethodName("Dubai", "Express"));
