import { delay } from '../utils.js';

/*
 * Liquidation keeper for SparkLend.  Spark is a fork of Aave and shares many
 * mechanics.  This module stubs out monitoring logic; in production you would
 * listen for health factor updates and call the pool’s liquidation function.
 */

export async function monitor() {
  console.log('Monitoring SparkLend positions for liquidation opportunities...');
  while (true) {
    console.log('[liquidation_spark] Stub: identify positions on Spark with HF < 1');
    await delay(20000);
  }
}

export async function execute() {
  console.log('liquidation_spark: execute() not implemented.');
  console.log('Execute by calling Spark’s liquidationCall() with borrower, debt asset and collateral asset.');
}