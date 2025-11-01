import { delay } from '../utils.js';

/*
 * Funding rate arbitrage on a single perpetual DEX.  If the funding rate
 * is positive (longs pay shorts), you can earn funding by holding a short
 * perpetual position and an offsetting long spot position.  This module
 * demonstrates how to monitor the funding rate and decide when to open/close
 * positions.  Actual on‑chain execution requires interacting with a perps DEX
 * smart contract.  Use caution: price movements can negate funding gains.
 */

export async function monitor() {
  console.log('Monitoring perps funding rate for arbitrage...');
  while (true) {
    console.log('[perp_funding_arbitrage] Stub: fetch current funding rate from perps protocol and compare to threshold');
    await delay(30000);
  }
}

export async function execute() {
  console.log('perp_funding_arbitrage: execute() not implemented.');
  console.log('To capture funding, open a long spot position and short perpetual position (or vice versa) on the DEX.');
}