import { delay } from '../utils.js';

/*
 * Arbitrage funding rate discrepancies between two perpetual DEXs.  When one
 * exchange has a higher funding rate than another, you can go long on one and
 * short on the other to capture the differential.  This stub simply logs
 * that you would fetch funding rates from both protocols and compare them.
 */

export async function monitor() {
  console.log('Monitoring cross‑exchange funding rate discrepancies...');
  while (true) {
    console.log('[cross_perp_funding] Stub: fetch funding rates on two perps protocols and compute difference');
    await delay(35000);
  }
}

export async function execute() {
  console.log('cross_perp_funding: execute() not implemented.');
  console.log('Open opposing positions on two perps exchanges when the funding differential exceeds transaction costs.');
}