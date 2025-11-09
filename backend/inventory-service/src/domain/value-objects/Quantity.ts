export class Quantity {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) throw new Error("Quantity cannot be negative");
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  add(amount: number): Quantity {
    return new Quantity(this.value + amount);
  }

  subtract(amount: number): Quantity {
    if (amount > this.value) throw new Error("Insufficient stock to subtract");
    return new Quantity(this.value - amount);
  }
}
