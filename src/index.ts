export enum CMCDKey {
  br = "br",
  bl = "bl",
  bs = "bs",
  cid = "cid",
  d = "d",
  dl = "dl",
  mtp = "mtp",
  nor = "nor",
  nrr = "nrr",
  ot = "ot",
  pr = "pr",
  rtp = "rtp",
  sf = "sf",
  sid = "sid",
  st = "st",
  su = "su",
  tb = "tb",
  v = "v"
}
const CMCD_MAP = {
  "br": "encodedBitrate",
  "bl": "bufferLength",
  "bs": "bufferStarvation",
  "cid": "contentId",
  "d": "objectDuration",
  "dl": "deadline",
  "mtp": "measuredThroughput",
  "nor": "nextObjectRequest",
  "nrr": "nextRangeRequest",
  "ot": "objectType",
  "pr": "playbackRate",
  "rtp": "requestedMaximumThroughput",
  "sf": "streamingFormat",
  "sid": "sessionId",
  "st": "streamType",
  "su": "startup",
  "tb": "topBitrate",
  "v": "version",
};

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
  protected _key: CMCDKey;
  protected _header: CMCDHdr;
  protected _value: T;

  constructor(key: CMCDKey, header: CMCDHdr, value: T) {
    this._key = key;
    this._header = header;
    this._value = value; 
  }

  get key(): string { return this._key.toString() }
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
  constructor(value: Number) { super(CMCDKey.br, CMCDHdr.object, value); }
}
export class CMCDBufferLength extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.bl, CMCDHdr.request, value); }
}
export class CMCDBufferStarvation extends CMCDBoolean {
  constructor(value: Boolean) { super(CMCDKey.bs, CMCDHdr.status, value); }
}
export class CMCDContentId extends CMCDString {
  constructor(value: string) { super(CMCDKey.cid, CMCDHdr.session, value); }
}
export class CMCDObjectDuration extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.d, CMCDHdr.object, value); }
}
export class CMCDDeadline extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.dl, CMCDHdr.request, value); }
}
export class CMCDMeasuredThroughput extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.mtp, CMCDHdr.request, value); }
}
export class CMCDNextObjectRequest extends CMCDString {
  constructor(value: string) { super(CMCDKey.nor, CMCDHdr.request, value); }
  toString() {
    const q = {};
    q[this.key] = this.value;
    const p = new URLSearchParams(q);
    const v = p.toString().split("=")[1];
    return this.key + "=" + `"${v}"`;
  }
}
export class CMCDNextRangeRequest extends CMCDString {
  constructor(value: string) { super(CMCDKey.nrr, CMCDHdr.request, value); }
}
export class CMCDObjectType extends CMCDValue<CMCDObjectTypeToken> {
  constructor(value: CMCDObjectTypeToken) { super(CMCDKey.ot, CMCDHdr.object, value) }
}
export class CMCDPlaybackRate extends CMCDDecimal {
  constructor(value: Number) { super(CMCDKey.pr, CMCDHdr.session, value); }
}
export class CMCDRequestedMaximumThroughput extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.rtp, CMCDHdr.status, value); }
}
export class CMCDStreamingFormat extends CMCDValue<CMCDStreamingFormatToken> {
  constructor(value: CMCDStreamingFormatToken) { super(CMCDKey.sf, CMCDHdr.session, value) }
}
export class CMCDSessionId extends CMCDString {
  constructor(value: string) { super(CMCDKey.sid, CMCDHdr.session, value); }
}
export class CMCDStreamType extends CMCDValue<CMCDStreamTypeToken> {
  constructor(value: CMCDStreamTypeToken) { super(CMCDKey.st, CMCDHdr.session, value) }
}
export class CMCDStartup extends CMCDBoolean {
  constructor(value: Boolean) { super(CMCDKey.su, CMCDHdr.request, value); }
}
export class CMCDTopBitrate extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.tb, CMCDHdr.object, value); }
}
export class CMCDVersion extends CMCDInteger {
  constructor(value: Number) { super(CMCDKey.v, CMCDHdr.session, value); }
}

function strcmp(a: string, b: string) {
  if (a === b) {
    return 0
  } else if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
}

function create<T>(ctor: { new (raw): T }, v): T {
  return v !== undefined ? new ctor(v) : undefined;
}

export function createPayload(searchParams: URLSearchParams, override?) : Payload {
  let values = [];
  const cmcdString = searchParams.get("CMCD");
  if (cmcdString) {
    values = cmcdString.split(",");
  }
  let init = {};
    
  if (override) {
    init = override;
  }
  values.forEach(kv => {
    const [k, v] = kv.split("=");
    if (init[CMCD_MAP[k]]) {
      // do not overwrite overrides
      return;
    }
    if (v) {
      if (v[0] === '"' && v[v.length - 1] === '"') {
        init[CMCD_MAP[k]] = v.substring(1, v.length - 1);
      } else if (v.match(/^[0-9\.]*$/)) {
        init[CMCD_MAP[k]] = Number(v);
      } else {
        init[CMCD_MAP[k]] = v;
      }
    } else {
      init[CMCD_MAP[k]] = true;
    }
  });
  return new Payload(init);
}

export class Payload {
  private _encodedBitrate?: CMCDEncodedBitrate;
  private _bufferLength?: CMCDBufferLength;
  private _bufferStarvation?: CMCDBufferStarvation;
  private _contentId?: CMCDContentId;
  private _objectDuration?: CMCDObjectDuration;
  private _deadline?: CMCDDeadline;
  private _measuredThroughput?: CMCDMeasuredThroughput;
  private _nextObjectRequest?: CMCDNextObjectRequest;
  private _nextRangeRequest?: CMCDNextRangeRequest;
  private _objectType?: CMCDObjectType;
  private _playbackRate?: CMCDPlaybackRate;
  private _requestedMaximumThroughput?: CMCDRequestedMaximumThroughput;
  private _streamingFormat?: CMCDStreamingFormat;
  private _sessionId?: CMCDSessionId;
  private _streamType?: CMCDStreamType;
  private _startup?: CMCDStartup;
  private _topBitrate?: CMCDTopBitrate;
  private _version?: CMCDVersion;

  constructor(v) {
    this._encodedBitrate = create(CMCDEncodedBitrate, v.encodedBitrate);
    this._bufferLength = create(CMCDBufferLength, v.bufferLength);
    this._bufferStarvation = create(CMCDBufferStarvation, v.bufferStarvation);
    this._contentId = create(CMCDContentId, v.contentId);
    this._objectDuration = create(CMCDObjectDuration, v.objectDuration);
    this._deadline = create(CMCDDeadline, v.deadline);
    this._measuredThroughput = create(CMCDMeasuredThroughput, v.measuredThroughput);
    this._nextObjectRequest = create(CMCDNextObjectRequest, v.nextObjectRequest);
    this._nextRangeRequest = create(CMCDNextRangeRequest, v.nextRangeRequest);
    this._objectType = create(CMCDObjectType, v.objectType);
    this._playbackRate = create(CMCDPlaybackRate, v.playbackRate);
    this._requestedMaximumThroughput = create(CMCDRequestedMaximumThroughput, v.requestedMaximumThroughput);
    this._streamingFormat = create(CMCDStreamingFormat, v.streamingFormat);
    this._sessionId = create(CMCDSessionId, v.sessionId);
    this._streamType = create(CMCDStreamType, v.streamType);
    this._startup = create(CMCDStartup, v.startup);
    this._topBitrate = create(CMCDTopBitrate, v.topBitrate);
    this._version = create(CMCDVersion, v.version);
  }

  get encodedBitrate(): Number { return this._encodedBitrate.value }
  get bufferLength(): Number { return this._bufferLength.value }
  get bufferStarvation(): Boolean { return this._bufferStarvation.value }
  get contentId(): string { return this._contentId.value }
  get objectDuration(): Number { return this._objectDuration.value }
  get deadline(): Number { return this._deadline.value }
  get measuredThroughput(): Number { return this._measuredThroughput.value }
  get nextObjectRequest(): string { return this._nextObjectRequest.value }
  get nextRangeRequest(): string { return this._nextRangeRequest.value }
  get objectType(): CMCDObjectTypeToken { return this._objectType.value }
  get playbackRate(): Number { return this._playbackRate.value }
  get requestedMaximumThroughput(): Number { return this._requestedMaximumThroughput.value }
  get streamingFormat(): CMCDStreamingFormatToken { return this._streamingFormat.value }
  get sessionId(): string { return this._sessionId.value }
  get streamType(): CMCDStreamTypeToken { return this._streamType.value }
  get startup(): Boolean { return this._startup.value }
  get topBitrate(): Number { return this._topBitrate.value }
  get version(): Number { return this._version.value }

  get headers() {
    let hdrs = {};
    Object.keys(CMCD_MAP).forEach(k => {
      const key = '_' + CMCD_MAP[k];
      if (this[key]) {
        const header = this[key].header.toString();
        if (!hdrs[header]) {
          hdrs[header] = [];
        }
        hdrs[header].push(this[key].toString());
      }
    });
    Object.keys(hdrs).forEach(k => {
      hdrs[k] = hdrs[k].sort((a, b) => strcmp(a, b)).join(',');
    });
    return hdrs;
  }

  toString() {
    let kv = [];
    Object.keys(CMCD_MAP).sort((a, b) => strcmp(a, b)).forEach(k => {
      const key = '_' + CMCD_MAP[k];
      if (this[key]) {
        kv.push(this[key].toString());
      }
    });
    if (kv.length > 0) {
      return new URLSearchParams({ CMCD: kv.join(",") }).toString();
    } else {
      return "";
    }
  }
}