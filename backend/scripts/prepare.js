var deedabi = require("../build/contracts/DeedRepository.json").abi;
var deedaddress = "0x62D68E65E70Cf78Ff91C7a0Bb39D8B0c05FE6d85";
var auctionabi = require("../build/contracts/AuctionRepository.json").abi;
var auctionaddress = "0x54eB3204e4BFD188F8992cC03227f327BcB0724B";

var deedinstance = new web3.eth.Contract(deedabi, deedaddress);
var auctioninstance = new web3.eth.Contract(auctionabi, auctionaddress);
var acc = web3.eth.accounts[0];
var ops = { from: acc, gas: 300000 };

//register a deed and transfer to auctionrepository address
console.log(deedinstance);
deedinstance.registerDeed(123456789, "metadata");
deedinstance.approve(auctionaddress, 123456789);
deedinstance.transferFrom(acc, auctionaddress, 123456789);

// create auction
var startprice = new web3.BigNumber(1000000000000000000);
auctioninstance.createAuction(
  deedaddress,
  123456789,
  "My NFT",
  "meta://",
  startprice,
  1683971405,
  ops
);

auctioninstance.getAuctionsCount(ops); // should be 1

auctioninstance.getAuctionById(0, ops);

auctioninstance.bidOnAuction(0, {
  from: web3.eth.accounts[1],
  gas: 300000,
  value: new web3.BigNumber(2000000000000000000),
}); // should be 1

// balance of account 2 should be 9899xxxxxx
web3.eth.getBalance(web3.eth.accounts[1]).toNumber();
