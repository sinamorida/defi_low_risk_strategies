import { delay } from '../utils.js';

/*
 * Arbitrage between fixed and floating rates on Notional Finance.  Notional
 * allows users to lend and borrow at fixed rates.  When the fixed rate is
 * significantly higher than the expected floating rate (or vice versa), you
 * can lock in profit by borrowing/lending appropriately.  This stub logs
 * where you would fetch rates and decide to rebalance.
 */

export async function monitor() {
  console.log('Monitoring fixed vs floating rates on Notional...');
  while (true) {
    console.log('[notional_fixed_float] Stub: query Notional markets for fixed rate and compare to variable yield');
    await delay(45000);
  }
}

export async function execute() {
  console.log('notional_fixed_float: execute() not implemented.');
  console.log('Borrow at the lower rate and lend at the higher rate to capture the spread on Notional.');
}