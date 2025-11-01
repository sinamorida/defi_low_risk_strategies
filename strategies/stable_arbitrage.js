import { ethers } from 'ethers';
import {
  getProvider,
  computePriceFromReserves,
  delay,
  UNISWAP_V2_PAIR_ABI,
  CURVE_STETH_POOL_ABI
} from '../utils.js';
import { UNISWAP_V2_PAIRS, CURVE_POOLS } from '../addresses.js';

/*
 * Micro‑arbitrage between stablecoin pairs on Uniswap and Curve/Balancer.
 *
 * This module monitors the USDC/WETH pair on Uniswap V2 and compares its implied
 * price against the Curve stETH/ETH pool as a demonstration.  In practice you
 * would extend this to other stable pairs (USDC/USDT, DAI/USDC, FRAX/USDC, etc.)
 * and compare across multiple AMMs.
 */

/**
 * Continuously monitors for price discrepancies between Uniswap and Curve.  Logs
 * opportunities when the spread exceeds a configurable threshold.  Does not
 * submit transactions by itself.
 */
export async function monitor() {
  const provider = getProvider('mainnet');
  const pairAddr = UNISWAP_V2_PAIRS.WETH_USDC;
  const pair = new ethers.Contract(pairAddr, UNISWAP_V2_PAIR_ABI, provider);
  const curvePool = new ethers.Contract(CURVE_POOLS.stETH_ETH, CURVE_STETH_POOL_ABI, provider);
  const threshold = 0.003; // 0.3% spread threshold
  console.log('Starting stable arbitrage monitor...');
  while (true) {
    try {
      const [reserve0, reserve1] = await pair.getReserves();
      // price of WETH in USDC on Uniswap V2
      const uniPrice = computePriceFromReserves(reserve0, reserve1, 18, 6);
      // approximate price from Curve using virtual price; for stable pools you would
      // call get_dy or similar depending on the pool
      const virtualPrice = await curvePool.get_virtual_price();
      // Convert virtual price to ETH: stETH ratio (virtual price expressed in 1e18)
      const curvePrice = Number(virtualPrice) / 1e18; // stETH price in ETH; ETH assumed at 1
      // For demonstration, treat curvePrice as 1 (ETH) since stETH ~ ETH
      // Compute spread in percentage terms
      const spread = Math.abs(uniPrice - 1) / 1; // difference from 1 (since ETH≈1 ETH)
      if (spread > threshold) {
        console.log(`[stable_arbitrage] Opportunity! Uniswap price: ${uniPrice.toFixed(4)} USDC/ETH; spread ${(spread*100).toFixed(2)}%`);
        // Here you could call execute() or build a transaction bundle
      }
    } catch (err) {
      console.error('Error in stable arbitrage monitor:', err);
    }
    await delay(15000); // wait 15 seconds between checks
  }
}

/**
 * Example execute function.  This function would create and send a flash swap or
 * flash loan transaction that buys ETH on the cheaper venue and sells on the
 * more expensive one.  Implementing the on‑chain atomic arbitrage logic is
 * beyond the scope of this example; here we simply outline the steps.
 */
export async function execute() {
  console.log('stable_arbitrage: execute() not fully implemented.');
  console.log('You should write a smart contract that performs a flash swap on Uniswap v2, then swaps back on Curve within the same transaction.');
  console.log('This execute function would build a transaction bundle and send it via Flashbots or a private RPC.');
}