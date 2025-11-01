import { delay } from '../utils.js';

/*
 * Carry trade using Maker’s DSR (via sDAI).  The idea is to borrow a
 * low‑interest stablecoin (e.g. USDC), convert to DAI and deposit into
 * the Dai Savings Rate (DSR) through the sDAI token.  The spread between
 * the borrow rate and the DSR is your profit.  This stub prints where you
 * would fetch rates and decide whether the spread is positive.
 */

export async function monitor() {
  console.log('Monitoring sDAI carry trade (DSR vs borrow cost)...');
  while (true) {
    console.log('[sdai_carry_trade] Stub: fetch current DSR and stablecoin borrow rate, compute spread');
    await delay(60000);
  }
}

export async function execute() {
  console.log('sdai_carry_trade: execute() not implemented.');
  console.log('Borrow a stablecoin (e.g. USDC), swap for DAI and deposit into the DSR via sDAI.');
}