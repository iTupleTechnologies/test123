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

class ShippingMethod {
  name: string;
  slots: Slot[] = [];

  constructor(name: string, slots: Slot[]) {
    this.name = name;
    this.addSlots(slots);
  }

  addSlot(slot: Slot) {
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

export { Slot, ShippingMethod, Supplier, city };
