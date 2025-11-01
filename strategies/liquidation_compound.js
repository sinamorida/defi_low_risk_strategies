import { delay } from '../utils.js';

/*
 * Liquidation keeper for Compound v2/v3.  Watches for accounts that exceed
 * their collateral factors and triggers liquidations to capture the
 * liquidation incentive.  Retrieval of borrower data can be done via the
 * Compound subgraph or by polling Comptroller functions.  This stub leaves
 * these details as an exercise.
 */

export async function monitor() {
  console.log('Monitoring Compound positions for liquidation opportunities...');
  while (true) {
    console.log('[liquidation_compound] Stub: query subgraph or Comptroller for accounts with shortfalls');
    await delay(25000);
  }
}

export async function execute() {
  console.log('liquidation_compound: execute() not implemented.');
  console.log('To liquidate on Compound, call liquidateBorrow() on the appropriate cToken contract specifying the borrower and repay amount.');
}