import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import axios from "axios";

import { deedaddress } from "../config.js";

import DeedRepository from "../../backend/build/contracts/DeedRepository.json";

export default function CreateAuction() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      deedaddress,
      DeedRepository.abi,
      signer
    );

    const result = await contract.fetchOwnedTokens();
    const { 0: deedIds, 1: uris } = result;
    console.log(deedIds);
    console.log(uris);
    let items = [];

    for (let i = 0; i < deedIds.length; i++) {
      const meta = await axios.get(uris[i]);

      let item = {
        deedId: deedIds[i],
        image: meta.data.image,
      };

      items.push(item);
    }

    setNfts(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !nfts.length)
    return (
      <h5 className="px-20 py-10 text-3xl">
        You need to create an NFT before starting the auction
      </h5>
    );

  return (
    <div className="flex flex-col bg-white m-auto p-auto">
      <h3 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
        Select NFT to sell
      </h3>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          <div className="inline-block px-3">
            {nfts.map((nft, i) => (
              <div
                key={i}
                className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <img src={nft.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
