import { delay } from '../utils.js';

/*
 * Arbitrage between Curve metapools and their base pools.  For example
 * FRAX/3Crv vs 3Crv.  When the value of the underlying tokens diverges from
 * the implied value in the metapool, an arbitrage exists.  This stub logs
 * a message indicating where calculations should occur.
 */

export async function monitor() {
  console.log('Monitoring Curve metapool vs base pool for arbitrage...');
  while (true) {
    console.log('[curve_metapool_arbitrage] Stub: query pool balances and compute implied token values');
    await delay(40000);
  }
}

export async function execute() {
  console.log('curve_metapool_arbitrage: execute() not implemented.');
  console.log('Swap underlying tokens in the metapool and base pool to exploit price discrepancies.');
}