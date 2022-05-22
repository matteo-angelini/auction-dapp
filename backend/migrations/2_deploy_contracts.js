const fs = require("fs");

var AuctionRepository = artifacts.require("./AuctionRepository.sol");
var DeedRepository = artifacts.require("./DeedRepository.sol");

module.exports = function (deployer) {
  let writer = fs.createWriteStream("../frontend/config.js");

  writer.write(
    `export const auctionaddress = "${AuctionRepository.address}"\n`
  );
  writer.write(`export const deedaddress = "${DeedRepository.address}"\n`);

  writer.end();

  deployer.deploy(AuctionRepository);
  deployer.deploy(DeedRepository, "Auction NFT", "ANFT");
};
