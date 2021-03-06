const utils = require("../../src/utils");
const { sha3 } = require("ethereumjs-util");

describe("Util Functions", () => {
  describe("hashArray", () => {
    it("should work", () => {
      const res = utils.hashArray(["a", "b", "1", 5]);

      const expectedHashResults = [
        "660c9a8d0051d07b1abd38e8a6f68076d98fdf948abd2a13e2870fe08a1343cc",
        "9261495095bfbb82deedb97b2be90d0f4c0d9a03fdd90a9da62c1bbcc45d7eb2",
        "a78c7e6cf27e778ce55aaa2a786943f1578bc76edcb296abc95981c786bb89c1",
        "ceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1"
      ];

      expect(res.map(p => p.hexSlice())).to.deep.equal(expectedHashResults);
    });
  });
  describe("bufSortJoin", () => {
    it("should work", () => {
      const res = utils.bufSortJoin(
        Buffer.from("c"),
        Buffer.from("b"),
        Buffer.from("a")
      );
      const expectedResults = "616263";
      expect(res.hexSlice()).to.deep.equal(expectedResults);
    });
  });

  describe("hashToBuffer", () => {
    it("should work", () => {
      expect(utils.hashToBuffer("foo")).to.deep.equal(
        Buffer.from("foo", "hex")
      );
    });

    it("should do nothing if the input is a hash", () => {
      const originalBuffer = Buffer.from("foo", "utf8");
      expect(utils.hashToBuffer(originalBuffer)).to.deep.equal(originalBuffer);
    });
  });
  describe("toBuffer", () => {
    it("should work", () => {
      expect(utils.toBuffer("foo").hexSlice()).to.deep.equal(
        "837fb5aa99ab7d0392fa43e61f529f072a693fd38032cd4a039793a9f9b4ea42"
      );
    });

    it("should do nothing if the input is a hash", () => {
      const originalBuffer = sha3(Buffer.from("foo", "utf8"));
      expect(utils.toBuffer(originalBuffer)).to.deep.equal(originalBuffer);
    });
  });
});
