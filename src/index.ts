export enum CMCDObjectTypeToken {
  manifest = "m",
  audio = "a",
  video = "v",
  muxed = "av",
  init = "i",
  caption = "c",
  timedtrack = "tt",
  key = "k",
  other = "o"
}
export enum CMCDStreamingFormatToken {
  mpd = "d",
  hls = "h",
  mss = "s",
  other = "o",
}
export enum CMCDStreamTypeToken {
  vod = "v",
  live = "l"
}
export enum CMCDHdr {
  object = "CMCD-Object",
  request = "CMCD-Request",
  status = "CMCD-Status",
  session = "CMCD-Session"
}

class CMCDValue<T> {
  protected _key: string;
  protected _header: CMCDHdr;
  protected _value: T;

  constructor(key: string, header: CMCDHdr, value: T) {
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
  constructor(value: Number) { super("br", CMCDHdr.object, value); }
}
export class CMCDBufferLength extends CMCDInteger {
  constructor(value: Number) { super("bl", CMCDHdr.request, value); }
}
export class CMCDBufferStarvation extends CMCDBoolean {
  constructor(value: Boolean) { super("bs", CMCDHdr.status, value); }
}
export class CMCDContentId extends CMCDString {
  constructor(value: string) { super("cid", CMCDHdr.session, value); }
}
export class CMCDObjectDuration extends CMCDInteger {
  constructor(value: Number) { super("d", CMCDHdr.object, value); }
}
export class CMCDDeadline extends CMCDInteger {
  constructor(value: Number) { super("dl", CMCDHdr.request, value); }
}
export class CMCDMeasuredThroughput extends CMCDInteger {
  constructor(value: Number) { super("mtp", CMCDHdr.request, value); }
}
export class CMCDNextObjectRequest extends CMCDString {
  constructor(value: string) { super("nor", CMCDHdr.request, value); }
  toString() {
    const q = {};
    q[this.key] = this.value;
    const p = new URLSearchParams(q);
    const v = p.toString().split("=")[1];
    return this.key + "=" + `"${v}"`;
  }
}
export class CMCDNextRangeRequest extends CMCDString {
  constructor(value: string) { super("nrr", CMCDHdr.request, value); }
}
export class CMCDObjectType extends CMCDValue<CMCDObjectTypeToken> {
  constructor(value: CMCDObjectTypeToken) { super("ot", CMCDHdr.object, value) }
}
export class CMCDPlaybackRate extends CMCDDecimal {
  constructor(value: Number) { super("pr", CMCDHdr.session, value); }
}
export class CMCDRequestedMaximumThroughput extends CMCDInteger {
  constructor(value: Number) { super("rtp", CMCDHdr.status, value); }
}
export class CMCDStreamingFormat extends CMCDValue<CMCDStreamingFormatToken> {
  constructor(value: CMCDStreamingFormatToken) { super("sf", CMCDHdr.session, value) }
}
export class CMCDSessionId extends CMCDString {
  constructor(value: string) { super("sid", CMCDHdr.session, value); }
}
export class CMCDStreamType extends CMCDValue<CMCDStreamTypeToken> {
  constructor(value: CMCDStreamTypeToken) { super("st", CMCDHdr.session, value) }
}
export class CMCDStartup extends CMCDBoolean {
  constructor(value: Boolean) { super("su", CMCDHdr.request, value); }
}
export class CMCDTopBitrate extends CMCDInteger {
  constructor(value: Number) { super("tb", CMCDHdr.object, value); }
}
export class CMCDVersion extends CMCDInteger {
  constructor(value: Number) { super("v", CMCDHdr.session, value); }
}

export function createPayload() {

}