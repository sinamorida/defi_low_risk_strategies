import { ethers } from 'ethers';
import { getProvider, delay, CURVE_STETH_POOL_ABI } from '../utils.js';
import { CURVE_POOLS } from '../addresses.js';

/*
 * Arbitrage stETH/ETH price deviations on Curve.  stETH should trade close
 * to 1 ETH but can deviate due to liquidity imbalances or withdrawal queues.
 * This module queries the Curve stETH pool and calculates the rate for
 * swapping stETH→ETH and vice versa.  When the deviation exceeds the fee,
 * it prints a message.
 */

export async function monitor() {
  const provider = getProvider('mainnet');
  const pool = new ethers.Contract(CURVE_POOLS.stETH_ETH, CURVE_STETH_POOL_ABI, provider);
  console.log('Monitoring stETH vs ETH price on Curve...');
  while (true) {
    try {
      // 1 ETH to stETH (i=0 (ETH), j=1 (stETH))
      const dyStEth = await pool.get_dy(0, 1, ethers.parseEther('1'));
      const stEthPerEth = Number(dyStEth) / 1e18;
      // 1 stETH to ETH (i=1, j=0)
      const dyEth = await pool.get_dy(1, 0, ethers.parseEther('1'));
      const ethPerStEth = Number(dyEth) / 1e18;
      // If stETH/ETH is >1, stETH expensive, sell stETH for ETH; if <1, buy stETH
      if (stEthPerEth > 1.003) {
        console.log(`[steth_arbitrage] stETH premium: 1 ETH -> ${stEthPerEth.toFixed(4)} stETH. Consider selling stETH back to ETH.`);
      } else if (stEthPerEth < 0.997) {
        console.log(`[steth_arbitrage] stETH discount: 1 ETH -> ${stEthPerEth.toFixed(4)} stETH. Consider buying stETH.`);
      }
      if (ethPerStEth > 1.003) {
        console.log(`[steth_arbitrage] ETH premium vs stETH: 1 stETH -> ${ethPerStEth.toFixed(4)} ETH. Consider swapping to stETH.`);
      }
    } catch (err) {
      console.error('Error in stETH arbitrage monitor:', err);
    }
    await delay(30000);
  }
}

export async function execute() {
  console.log('steth_arbitrage: execute() not implemented.');
  console.log('In production you would build a transaction that swaps stETH and ETH via Curve or via a flash loan.');
}