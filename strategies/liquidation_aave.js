import { delay } from '../utils.js';

/*
 * Liquidation keeper for Aave v3.  Identifies accounts with a health factor
 * below 1 and executes liquidations to earn the liquidation bonus.  The
 * mechanics of retrieving account data from The Graph or Aave’s subgraph and
 * calling the `liquidationCall` function are outside the scope of this stub.
 */

export async function monitor() {
  console.log('Monitoring Aave v3 positions for liquidation opportunities...');
  // In practice you would query the Aave subgraph to find accounts with HF < 1
  while (true) {
    console.log('[liquidation_aave] Stub: query subgraph for undercollateralised positions');
    await delay(20000);
  }
}

export async function execute() {
  console.log('liquidation_aave: execute() not implemented.');
  console.log('To liquidate an account, call the Aave v3 pool\'s liquidation function with the borrower address, debt asset and collateral asset.');
}