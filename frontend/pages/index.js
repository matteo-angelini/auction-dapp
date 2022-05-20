import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { auctionaddress, deedaddress } from "../config.js"

import AuctionRepository from '../../backend/build/contracts/AuctionRepository.json'
import DeedRepository from '../../backend/build/contracts/DeedRepository.json'

export default function Home() {
  const auctionAddress = "0xf97eb780b62Eff01F3DeC99c1C91c2c0a1413a92"
  const deedAddress = "0xcE8F75af08cE5EEf2DcA1d8318E15764c754CE0D"
  const [auctions, setAuctions] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadAuctions()
  }, [])

  // TODO: add image functionality 
  async function loadAuctions() {
    /* create a generic provider and query for available auctions */
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:9545")
    const contract = new ethers.Contract(auctionAddress, AuctionRepository.abi, provider)
    const data = await contract.fetchActiveAuctions()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const deadline = new Date(i.blockDeadline)
      let item = {
        deedId: i.deedId,
        owner: i.owner,
        image: "",
        name: i.name,
        blockDeadline : deadline
      }
      return item
    }))
    
    setAuctions(items)
    setLoadingState('loaded')
  }

  async function bidAuction(deedId) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(auctionAddress, AuctionRepository.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(deed.price.toString(), 'ether')   
    contract.bidOnAuction(auctionId, price)
    loadAuctions()
  }

  if (loadingState === 'loaded' && !auctions.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            auctions.map((auction, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={auction.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{auction.name}</p>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Deadline: {auction.blockDeadline}</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => bidAuction(auction.deedId)}>Bid</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
