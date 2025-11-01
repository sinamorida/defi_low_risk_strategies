# DeFi Strategy Suite

This repository bundles a variety of DeFi strategies that can be executed without relying on large off‑chain datasets or machine–learning models.  Each strategy lives in its own module under the `strategies/` directory and exposes a simple API for monitoring opportunities and executing trades when profitable.

The emphasis is on **clarity and modularity**—every module shows the core logic needed to detect an opportunity, evaluate profitability, and (optionally) build a transaction.  You are free to extend these modules with additional risk checks, logging and analytics.

> **Disclaimer:** These modules are provided for educational purposes only.  Running them against public networks involves economic risk.  Always test on testnets or mainnet forks before committing real capital.

## Setup

1. Copy the provided `.env.example` to `.env` and fill in your RPC endpoints and private key:

   ```bash
   cp .env.example .env
   # edit .env and set RPC_MAINNET_URL, RPC_ARBITRUM_URL etc.
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run an individual strategy watcher:

   ```bash
   node strategies/stable_arbitrage.js
   ```

   Many of the modules export both a `monitor()` function for continuous watching and an `execute()` function that can be called to perform a trade when a signal is detected.

## Strategies

Below is a high level overview of the 20 strategies implemented in this repository.  For a deeper explanation of the underlying economic rationale behind each one, refer to the in‑line comments in the corresponding module.

| Module | Description |
|---|---|
| **stable_arbitrage.js** | Micro‑arbitrage between stablecoin pairs on Uniswap V2 and Curve/Balancer.  Uses on‑chain reserves to compute implied prices and compares them to detect spreads. |
| **triangular_arbitrage.js** | Executes triangular cycles such as ETH→USDC→DAI→ETH within a single DEX.  Calculates cycle profitability based on current reserves. |
| **bridged_usdc_arbitrage.js** | Monitors price gaps between bridged tokens (e.g. USDC.e) and their native counterparts across chains or L2s.  Considers bridge fees to assess profitability. |
| **psm_arbitrage.js** | Arbitrage between MakerDAO’s Peg Stability Module (PSM) and open market prices for DAI/USDC.  Detects when it is cheaper to mint or redeem DAI via the PSM. |
| **steth_arbitrage.js** | Looks for deviations of the stETH:ETH ratio in Curve’s stETH pool.  Computes the discount/premium and suggests trades accordingly. |
| **balancer_linear_rebalance.js** | Observes Balancer linear pools (e.g. boosted Aave pools) and takes advantage of rebalancing incentives when the pool deviates from its target ratio. |
| **bridge_cost_arbitrage.js** | Compares all‑in bridging costs (Across, Hop, Synapse, etc.) against on‑chain prices to identify profitable inter‑chain arbitrage loops. |
| **cow_solver_service.js** | Provides a simple solver for CoW Protocol batch auctions.  Determines an optimal path for matching orders and collects solver rewards. |
| **mev_share_backrun.js** | Uses Flashbots/MEV‑Share to backrun large trades on AMMs.  Builds a bundle that captures the price impact without front‑running. |
| **uniswap_v3_range.js** | Demonstrates concentrated liquidity provision on Uniswap v3 around the current price.  Computes range boundaries and monitors fee income. |
| **liquidation_aave.js** | Detects undercollateralised positions on Aave v3 and triggers liquidations when the health factor drops below 1.  Earns liquidation bonus. |
| **liquidation_compound.js** | Similar to Aave but targets Compound v2/v3.  Monitors accounts and executes profitable liquidations. |
| **liquidation_spark.js** | Focuses on SparkLend (a fork of Aave) and listens for liquidatable accounts via the `liquidationCall` function. |
| **maker_auction_arbitrage.js** | Snipes auctions in Maker’s collateral auctions (Dutch/Clipper).  Calculates the optimal bid as a function of auction decay and market prices. |
| **perp_funding_arbitrage.js** | Captures positive funding by taking opposing positions in spot and perpetual markets on DEXs such as Perpetual Protocol. |
| **cross_perp_funding.js** | Arbitrages funding rate discrepancies between two perpetual DEXs by going long on one and short on the other. |
| **curve_metapool_arbitrage.js** | Exploits price gaps between metapools (e.g. FRAX/3Crv) and the base 3Crv pool.  Utilises the `exchange_underlying` function. |
| **notional_fixed_float.js** | Switches between fixed and variable rate borrowing/lending on Notional to lock in favourable yields. |
| **sdai_carry_trade.js** | Performs a carry trade by borrowing cheap stablecoins, converting to DAI, and depositing into Maker’s DSR via sDAI. |
| **pendle_pt_yt_arbitrage.js** | Monitors Pendle principal (PT) and yield (YT) tokens for mispricings relative to the expected fixed yield. |

## Extending the Code

The intention of this repository is to provide a **solid starting point**.  While many modules include working contract calls and price computations, others are intentionally lightweight.  You can extend each file by adding:

* Additional safety checks (reorg protection, slippage limits, gas estimation)
* Integration with private mempools (MEV‑Share, Flashbots) for transaction inclusion
* Logging, alerting and persistence (e.g. store historical opportunities in a database)
* More sophisticated strategies (e.g. JIT liquidity in Uniswap v3, dynamic bidding algorithms)

Please contribute back improvements if you find them useful!