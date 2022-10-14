import { createPayload, CMCDString, CMCDBoolean, CMCDInteger, CMCDDecimal, CMCDEncodedBitrate, CMCDBufferLength, CMCDBufferStarvation, CMCDContentId, CMCDObjectDuration, CMCDDeadline, CMCDMeasuredThroughput, CMCDNextObjectRequest, CMCDObjectType, CMCDNextRangeRequest, CMCDObjectTypeToken, CMCDHdr, CMCDPlaybackRate, CMCDRequestedMaximumThroughput, CMCDStreamingFormat, CMCDStreamingFormatToken, CMCDSessionId, CMCDStreamType, CMCDStreamTypeToken, CMCDStartup, CMCDTopBitrate, CMCDVersion } from ".";

describe("CMCD Basic Type", () => {
  test("string", () => {
    const cmcdString = new CMCDString("cid", CMCDHdr.session, "foobar");
    expect(cmcdString.value).toEqual("foobar");
    expect(cmcdString.toString()).toEqual('cid="foobar"');
  });

  test("boolean", () => {
    const cmcdBooleanTrue = new CMCDBoolean("bs", CMCDHdr.status, true);
    expect(cmcdBooleanTrue.value).toEqual(true);
    expect(cmcdBooleanTrue.toString()).toEqual("bs");

    const cmcdBooleanFalse = new CMCDBoolean("bs", CMCDHdr.status, false);
    expect(cmcdBooleanFalse.value).toEqual(false);
    expect(cmcdBooleanFalse.toString()).toEqual("");
  });

  test("number", () => {
    const cmcdInteger = new CMCDInteger("br", CMCDHdr.object, 2000);
    expect(cmcdInteger.value).toEqual(2000);
    expect(cmcdInteger.toString()).toEqual("br=2000");

    const cmcdDecimal = new CMCDDecimal("d", CMCDHdr.object, 4.5);
    expect(cmcdDecimal.value).toEqual(4.5);
    expect(cmcdDecimal.toString()).toEqual("d=4.5")
  });
});

describe("CMCD Type", () => {
  test("EncodedBitrate", () => {
    expect(new CMCDEncodedBitrate(4232).toString()).toEqual("br=4232");
  });
  test("BufferLength", () => {
    expect(new CMCDBufferLength(1000).toString()).toEqual("bl=1000");
  });
  test("BufferStarvation", () => {
    expect(new CMCDBufferStarvation(true).toString()).toEqual("bs");
    expect(new CMCDBufferStarvation(false).toString()).toEqual("");
  });
  test("ContentId", () => {
    expect(new CMCDContentId("foobar").toString()).toEqual('cid="foobar"');
  });
  test("ObjectDuration", () => {
    expect(new CMCDObjectDuration(2000).toString()).toEqual("d=2000");
  });
  test("Deadline", () => {
    expect(new CMCDDeadline(2300).toString()).toEqual("dl=2300");
  });
  test("Measured Throughput", () => {
    expect(new CMCDMeasuredThroughput(2500).toString()).toEqual("mtp=2500");
  });
  test("Next Object Request", () => {
    expect(new CMCDNextObjectRequest("fil2.ts?quack").toString()).toEqual('nor="fil2.ts%3Fquack"');
  });
  test("Next Range Request", () => {
    expect(new CMCDNextRangeRequest("200-300").toString()).toEqual('nrr="200-300"');
  });
  test("Object Type", () => {
    expect(new CMCDObjectType(CMCDObjectTypeToken.muxed).toString()).toEqual("ot=av");
  });
  test("Playback Rate", () => {
    expect(new CMCDPlaybackRate(1.5).toString()).toEqual("pr=1.5");
  });
  test("Requested Maximum Throughput", () => {
    expect(new CMCDRequestedMaximumThroughput(3000).toString()).toEqual("rtp=3000");
  });
  test("Streaming Format", () => {
    expect(new CMCDStreamingFormat(CMCDStreamingFormatToken.hls).toString()).toEqual("sf=h");
  });
  test("SessionId", () => {
    expect(new CMCDSessionId("barlow").toString()).toEqual('sid="barlow"');
  });
  test("Stream Type", () => {
    expect(new CMCDStreamType(CMCDStreamTypeToken.live).toString()).toEqual("st=l");
  });
  test("Startup", () => {
    expect(new CMCDStartup(true).toString()).toEqual("su");
    expect(new CMCDStartup(false).toString()).toEqual("");
  });
  test("Top Bitrate", () => {
    expect(new CMCDTopBitrate(20000).toString()).toEqual("tb=20000");
  });
  test("Version", () => {
    expect(new CMCDVersion(1).toString()).toEqual("v=1");
  });

});

/*
describe("CMCD Payload", () => {
  test("can be constructed from URLSearchParams instance", () => {
    const params = new URLSearchParams("CMCD=br%3D3200%2Cbs%2Cd%3D4004%2Cmtp%3D25400%2Cot%3Dv%2Crtp%3D15000%2Csid%3D%226e2fb550-c457-11e9-bb97-0800200c9a66%22%2Ctb%3D6000");
    const payload = createPayload(params);
    expect(payload.sessionId).toEqual('6e2fb550-c457-11e9-bb97-0800200c9a66');
  });
});
*/