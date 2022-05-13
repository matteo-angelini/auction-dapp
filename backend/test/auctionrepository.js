const AuctionRepository = artifacts.require("./AuctionRepository.sol");
const fs = require("fs");

contract("AuctionRepository", async (accounts) => {
  it("It should check if the auction repository is initialized", async () => {
    let instance = await AuctionRepository.deployed();
    fs.writeFileSync("./test/output.address", instance.address);
    let auctionLength = await instance.getCount();
    assert.equal(
      auctionLength.valueOf(),
      0,
      `${auctionLength} auctions instead of 0`
    );
  });
});
