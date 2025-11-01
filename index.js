/*
 * entry point for the strategy suite
 *
 * This script allows you to launch any of the strategy modules from the command line.
 * You can specify the module name and an optional action (monitor or execute).
 *
 * Example usage:
 *   node index.js stable_arbitrage monitor
 *   node index.js liquidation_aave execute
 */

import dotenv from 'dotenv';
dotenv.config();

// Load the requested module dynamically
const [,, moduleName, action = 'monitor'] = process.argv;

async function main() {
  if (!moduleName) {
    console.error('Usage: node index.js <moduleName> [monitor|execute]');
    process.exit(1);
  }
  try {
    const module = await import(`./strategies/${moduleName}.js`);
    if (action === 'monitor' && typeof module.monitor === 'function') {
      await module.monitor();
    } else if (action === 'execute' && typeof module.execute === 'function') {
      await module.execute();
    } else {
      console.error(`Unknown action or missing function in module: ${action}`);
    }
  } catch (err) {
    console.error(`Failed to load module ${moduleName}:`, err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
});