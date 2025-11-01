import { ethers } from 'ethers';
import { getProvider, delay, UNISWAP_V2_PAIR_ABI, computePriceFromReserves } from '../utils.js';
import { UNISWAP_V2_PAIRS } from '../addresses.js';

/*
 * Demonstrates providing concentrated liquidity on Uniswap v3.  It does not
 * actually add liquidity but instead calculates a recommended price range
 * around the current market price based on a configurable width.  Monitoring
 * fee accrual requires interacting with the position NFT which is beyond
 * this example.
 */

export async function monitor() {
  const provider = getProvider('mainnet');
  const pair = new ethers.Contract(UNISWAP_V2_PAIRS.WETH_USDC, UNISWAP_V2_PAIR_ABI, provider);
  const widthPct = 0.02; // 2% width on either side of the current price
  console.log('Monitoring Uniswap v3 price to compute optimal liquidity range...');
  while (true) {
    try {
      const [reserve0, reserve1] = await pair.getReserves();
      const price = computePriceFromReserves(reserve0, reserve1); // ETH price in USDC
      const lower = price * (1 - widthPct);
      const upper = price * (1 + widthPct);
      console.log(`[uniswap_v3_range] Current price: ${price.toFixed(2)} USDC/ETH. Suggested range: [${lower.toFixed(2)}, ${upper.toFixed(2)}]`);
    } catch (err) {
      console.error('Error in Uniswap v3 range monitor:', err);
    }
    await delay(60000);
  }
}

export async function execute() {
  console.log('uniswap_v3_range: execute() not implemented.');
  console.log('To provide liquidity you would mint a Uniswap v3 position NFT specifying the tick range and deposit tokens.');
}