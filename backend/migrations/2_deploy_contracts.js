const fs = require("fs");

var AuctionRepository = artifacts.require("./AuctionRepository.sol");
var DeedRepository = artifacts.require("./DeedRepository.sol");

module.exports = function (deployer) {
  deployer.deploy(AuctionRepository);
  deployer.deploy(DeedRepository, "Auction NFT", "ANFT");

  fs.writeFileSync(
    "../frontend/config.js",
    `export const auctionaddress = "${AuctionRepository.address}"\nexport const deedaddress = "${DeedRepository.address}"`
  );
};
