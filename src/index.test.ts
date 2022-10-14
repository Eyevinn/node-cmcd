import { createPayload, CMCDString, CMCDBoolean, CMCDInteger, CMCDDecimal, CMCDEncodedBitrate, CMCDBufferLength, CMCDBufferStarvation } from ".";

describe("CMCD Basic Type", () => {
  test("string", () => {
    const cmcdString = new CMCDString("cid", "CMCD-Session", "foobar");
    expect(cmcdString.value).toEqual("foobar");
    expect(cmcdString.toString()).toEqual('cid="foobar"');
  });

  test("boolean", () => {
    const cmcdBooleanTrue = new CMCDBoolean("bs", "CMCD-Status", true);
    expect(cmcdBooleanTrue.value).toEqual(true);
    expect(cmcdBooleanTrue.toString()).toEqual("bs");

    const cmcdBooleanFalse = new CMCDBoolean("bs", "CMCD-Status", false);
    expect(cmcdBooleanFalse.value).toEqual(false);
    expect(cmcdBooleanFalse.toString()).toEqual("");
  });

  test("number", () => {
    const cmcdInteger = new CMCDInteger("br", "CMCD-Object", 2000);
    expect(cmcdInteger.value).toEqual(2000);
    expect(cmcdInteger.toString()).toEqual("br=2000");

    const cmcdDecimal = new CMCDDecimal("d", "CMCD-Object", 4.5);
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
  })
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