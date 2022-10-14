class CMCDValue<T> {
  protected _key: string;
  protected _header: string;
  protected _value: T;

  constructor(key: string, header: string, value: T) {
    this._key = key;
    this._header = header;
    this._value = value; 
  }

  get key(): string { return this._key }
  get header(): string { return this._header }
  get value(): T { return this._value }

  toString(): string { return this.key + '=' + this.value.toString() }
}

// Basic types
export class CMCDString extends CMCDValue<string> {
  toString(): string { return this.key + '="' + this.value + '"' }
}
export class CMCDBoolean extends CMCDValue<Boolean> {
  toString(): string { return (this.value === true ? this.key : "") }
}
export class CMCDInteger extends CMCDValue<Number> { }
export class CMCDDecimal extends CMCDValue<Number> { }

// CMCD Types
export class CMCDEncodedBitrate extends CMCDInteger {
  constructor(value: Number) { super("br", "CMCD-Object", value); }
}
export class CMCDBufferLength extends CMCDInteger {
  constructor(value: Number) { super("bl", "CMCD-Request", value); }
}
export class CMCDBufferStarvation extends CMCDBoolean {
  constructor(value: Boolean) { super("bs", "CMCD-Status", value); }
}

export function createPayload() {

}