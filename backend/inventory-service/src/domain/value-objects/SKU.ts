export class SKU {
  private readonly value: string;

  constructor(value: string) {
    const skuFormatExp = /^[A-Z0-9\-]+$/;
    if (!skuFormatExp.test(value)) throw new Error("Invalid SKU format");
    this.value = value.toUpperCase();
  }

  getValue() {
    return this.value;
  }

  equals(other: SKU) {
    return this.value == other.value;
  }
}
