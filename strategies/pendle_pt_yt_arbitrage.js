import { delay } from '../utils.js';

/*
 * Arbitrage between Pendle PT (principal tokens) and YT (yield tokens).  At
 * maturity a PT redeems for a known amount of the underlying asset.  When a
 * PT trades at a discount inconsistent with the implied yield, you can buy
 * the PT and lock in a fixed return.  Similarly, mispricing between PT and
 * YT creates opportunities.  This stub logs where you would fetch prices and
 * compute the implied yield.
 */

export async function monitor() {
  console.log('Monitoring Pendle PT/YT price discrepancies...');
  while (true) {
    console.log('[pendle_pt_yt_arbitrage] Stub: query Pendle market for PT and YT prices, compute implied yield and spot rate');
    await delay(50000);
  }
}

export async function execute() {
  console.log('pendle_pt_yt_arbitrage: execute() not implemented.');
  console.log('Buy undervalued PT tokens and sell/short overvalued YT tokens to lock in the implied yield.');
}