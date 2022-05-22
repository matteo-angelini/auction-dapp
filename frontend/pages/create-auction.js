import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { deedaddress } from "../config.js";

import DeedRepository from "../../backend/build/contracts/DeedRepository.json";

export default function CreateAuction() {
  const [nfts, setNfts] = useState([]);

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

    console.log("Signer: " + signer);

    const deeds = contract.fetchOwnedTokens();
  }
}
