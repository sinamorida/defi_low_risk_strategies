/*
 * Centralised list of contract addresses used in the strategy modules.
 *
 * These addresses correspond to Ethereum mainnet unless stated otherwise.
 * Feel free to extend this list or override values via environment variables.
 */

export const UNISWAP_V2_PAIRS = {
  // WETH/USDC pair (Uniswap V2)
  WETH_USDC: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
  // USDC/USDT pair (Uniswap V2)
  USDC_USDT: '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f',
  // DAI/USDC pair (Uniswap V2)
  DAI_USDC: '0x6C6Bc977E13Df9E6708bE626d2cB2e35EF983D63',
  // ETH/DAI pair (Uniswap V2)
  WETH_DAI: '0xA478c2975Ab1ea89e8196811F51A7B7Ade33eB11'
};

export const CURVE_POOLS = {
  // stETH / ETH pool
  stETH_ETH: '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022',
  // 3Crv base pool
  ThreePool: '0xA701349C1b2fba0f28F79fF9f886b96F5e8c41f6',
  // FRAX/3Crv metapool
  FRAX_3CRV: '0xDcEF968d416a41Cdac0ED8702fAC8128A64241A2'
};

export const BALANCER_POOLS = {
  // Example linear/boosted pool addresses (Aave Boosted Pool for DAI and USDC on Balancer)
  BoostedDAI: '0x7FcC842ffb3d4e3E14eD64801442f9bEa2109AD5',
  BoostedUSDC: '0xD8D3f2f2265A537Ca71CC3A9505fe06e0bE45698'
};

export const AAVE_POOL = '0x7Be1B9716506AFd0d24cdd7F603bf4635d8b4c99';
export const COMPOUND_COMPTROLLER = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b';
export const SPARK_POOL = '0x20dF2f24D5Ef8f5E05478e5485975b7c841e054D';

export const MAKER_AUCTION_HOUSE = {
  // Example addresses for Maker's FLAP (surplus) and FLIP (collateral) auctions.
  // Use the actual addresses for the vault/collateral you care about.
  FLAP: '0xC0FE3a8C69098FC203c864DC5ce7c7B23df71c45',
  FLIP_ETH_A: '0x659eAe5C7C9c6CaBb30bb0800907b1c09799eb3f'
};

export const PERP_PROTOCOLS = {
  PERPETUAL_V2: '0x9f00E5Ef9B73331a797381c030e463B2e014f771',
  GMX: '0x294de0D2e0388AF64376F104fBC90f2057538351'
};

export const NOTIONAL_ADDRESS = '0x5f5e51be9d66c6629EF4E16c985a6c7a0e2b92e7';

export const PENDLE_MARKETS = {
  // Example Pendle market for a stETH yield token
  stETH: {
    PT: '0xaaa5A1d2d0d3D1Bf016fFea6F3e60F67F5b143b5',
    YT: '0xbbbbb06BB6e2A0dA285Be3944F52dA37093053Ef'
  }
};