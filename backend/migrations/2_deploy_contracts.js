const fs = require("fs");

var AuctionRepository = artifacts.require("./AuctionRepository.sol");
var DeedRepository = artifacts.require("./DeedRepository.sol");

module.exports = function (deployer) {
  deployer
    .deploy(AuctionRepository)
    .then(
      async () =>
        await fs.writeFileSync(
          "../frontend/config.js",
          `export const auctionaddress = "${AuctionRepository.address}"\n`
        )
    );
  deployer
    .deploy(DeedRepository, "Auction NFT", "ANFT")
    .then(
      async () =>
        await fs.appendFileSync(
          "../frontend/config.js",
          `export const deedaddress = "${DeedRepository.address}"`
        )
    );
};
