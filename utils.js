import { ethers } from 'ethers';

/*
 * Utility helpers shared across strategy modules.
 */

// Load RPC endpoints from environment variables
const RPC_MAINNET_URL = process.env.RPC_MAINNET_URL;
const RPC_ARBITRUM_URL = process.env.RPC_ARBITRUM_URL;
const RPC_OPTIMISM_URL = process.env.RPC_OPTIMISM_URL;

/**
 * Returns an ethers provider for the requested chain.
 * Supported chains: 'mainnet', 'arbitrum', 'optimism'.  Falls back
 * to mainnet if an unknown chain is supplied.
 *
 * @param {string} chain
 * @returns {ethers.JsonRpcProvider}
 */
export function getProvider(chain = 'mainnet') {
  switch (chain) {
    case 'arbitrum':
      return new ethers.JsonRpcProvider(RPC_ARBITRUM_URL || RPC_MAINNET_URL);
    case 'optimism':
      return new ethers.JsonRpcProvider(RPC_OPTIMISM_URL || RPC_MAINNET_URL);
    case 'mainnet':
    default:
      return new ethers.JsonRpcProvider(RPC_MAINNET_URL);
  }
}

/**
 * Returns a signer using the PRIVATE_KEY environment variable and a provider.
 * If no private key is configured, returns null.
 *
 * @param {string} chain
 * @returns {ethers.Wallet|null}
 */
export function getSigner(chain = 'mainnet') {
  const key = process.env.PRIVATE_KEY;
  if (!key || key.length < 10) return null;
  const provider = getProvider(chain);
  return new ethers.Wallet(key, provider);
}

/**
 * Converts BigInt values from Uniswap reserves into a price.  Assumes
 * token0/token1 decimals are 18 and 6 respectively (e.g. WETH/USDC).
 *
 * @param {bigint} reserve0
 * @param {bigint} reserve1
 * @param {number} decimals0 defaults to 18
 * @param {number} decimals1 defaults to 6
 */
export function computePriceFromReserves(reserve0, reserve1, decimals0 = 18, decimals1 = 6) {
  // price of token0 in terms of token1 = (reserve1 / 10^decimals1) / (reserve0 / 10^decimals0)
  const num = Number(reserve1) / 10 ** decimals1;
  const den = Number(reserve0) / 10 ** decimals0;
  return num / den;
}

/**
 * Sleeps for the given number of milliseconds.  Useful in monitors.
 *
 * @param {number} ms
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Frequently used token addresses (mainnet)
export const TOKENS = {
  WETH: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606e48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  FRAX: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  sDAI: '0x8f3cf7ad23Cd3CaDbD9735AFf958023239c6A063'
};

/**
 * Loads a minimal ABI for Uniswap V2 pair contracts to fetch reserves.
 */
export const UNISWAP_V2_PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)'
];

/**
 * Loads a minimal ERC20 ABI to query decimals and balances.
 */
export const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)' 
];

/**
 * Loads a minimal Curve pool ABI for stETH pool interactions.
 */
export const CURVE_STETH_POOL_ABI = [
  'function get_virtual_price() view returns (uint256)',
  'function get_dy(int128 i, int128 j, uint256 dx) view returns (uint256)' 
];

/**
 * Common helper to fetch decimals of an ERC20 token.
 * @param {string} address
 * @param {ethers.Provider} provider
 * @returns {Promise<number>}
 */
export async function getDecimals(address, provider) {
  const erc20 = new ethers.Contract(address, ERC20_ABI, provider);
  const dec = await erc20.decimals();
  return Number(dec);
}