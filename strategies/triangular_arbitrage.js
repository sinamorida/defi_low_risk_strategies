import { ethers } from 'ethers';
import { getProvider, computePriceFromReserves, delay, UNISWAP_V2_PAIR_ABI } from '../utils.js';
import { UNISWAP_V2_PAIRS } from '../addresses.js';

/*
 * Triangular arbitrage within a single DEX (e.g. Uniswap V2).  By rotating
 * through three pairs (A→B, B→C, C→A) you can sometimes earn a risk‑free
 * profit if the product of exchange rates is greater than one after fees.
 */

/**
 * Calculates the triangular cycle rate for tokens A→B→C→A.  Assumes each
 * intermediate pool is a Uniswap V2 pair.  A, B and C are represented by
 * pair addresses in the UNISWAP_V2_PAIRS map.  Returns the cycle multiplier.
 *
 * In a production system you must account for token ordering (token0/token1)
 * and invert rates when necessary.  Here we assume the ordering matches
 * WETH→USDC→DAI for simplicity.
 */
async function calcCycle(provider, pair1, pair2, pair3) {
  const contract1 = new ethers.Contract(pair1, UNISWAP_V2_PAIR_ABI, provider);
  const contract2 = new ethers.Contract(pair2, UNISWAP_V2_PAIR_ABI, provider);
  const contract3 = new ethers.Contract(pair3, UNISWAP_V2_PAIR_ABI, provider);
  const [r10, r11] = await contract1.getReserves();
  const [r20, r21] = await contract2.getReserves();
  const [r30, r31] = await contract3.getReserves();
  const p1 = computePriceFromReserves(r10, r11); // A→B price
  const p2 = computePriceFromReserves(r20, r21); // B→C price
  const p3 = computePriceFromReserves(r30, r31); // C→A price
  // Uniswap v2 fee is 0.3% per swap: multiply by 0.997 for each trade
  const feeFactor = 0.997 * 0.997 * 0.997;
  const cycle = p1 * p2 * p3 * feeFactor;
  return cycle;
}

/**
 * Continuously checks the WETH→USDC→DAI→WETH cycle for arbitrage opportunities.
 */
export async function monitor() {
  const provider = getProvider('mainnet');
  // define the three pairs forming the cycle: WETH→USDC, USDC→DAI, DAI→WETH
  const pairAB = UNISWAP_V2_PAIRS.WETH_USDC;
  const pairBC = UNISWAP_V2_PAIRS.DAI_USDC; // use DAI/USDC for B→C (note order)
  const pairCA = UNISWAP_V2_PAIRS.WETH_DAI;
  console.log('Starting triangular arbitrage monitor...');
  while (true) {
    try {
      const cycle = await calcCycle(provider, pairAB, pairBC, pairCA);
      if (cycle > 1.0005) {
        const profitPct = (cycle - 1) * 100;
        console.log(`[triangular_arbitrage] Opportunity! Cycle multiplier: ${cycle.toFixed(4)} (~${profitPct.toFixed(2)}% profit)`);
        // In a real implementation you would call execute() or construct a flash swap here
      }
    } catch (err) {
      console.error('Error in triangular arbitrage monitor:', err);
    }
    await delay(20000);
  }
}

export async function execute() {
  console.log('triangular_arbitrage: execute() not implemented.');
  console.log('To realise this opportunity you need a contract that performs three swaps in one atomic transaction.');
}