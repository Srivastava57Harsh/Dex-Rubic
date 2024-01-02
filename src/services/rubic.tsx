import {
  SDK,
  BLOCKCHAIN_NAME,
  Configuration,
  WalletProvider,
  CHAIN_TYPE,
  //@ts-ignore
  TradeType,
  EvmCrossChainTrade,
} from "rubic-sdk";

import { useAccount } from "wagmi";

export async function InitializeApp() {
  const address = localStorage.getItem("userAddress");
  const walletProvider: WalletProvider = {
    [CHAIN_TYPE.EVM]: {
      //@ts-ignore
      address: address || "0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368",
      //@ts-ignore
      core: window.ethereum,
    },
  };

  const configuration: Configuration = {
    rpcProviders: {
      [BLOCKCHAIN_NAME.ETHEREUM]: {
        rpcList: [
          "https://eth.llamarpc.com",
          "https://rpc.mevblocker.io/fullprivacy",
        ],
      },
      [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        rpcList: ["https://bsc-dataseed3.defibit.io"],
      },
      [BLOCKCHAIN_NAME.POLYGON]: {
        rpcList: ["https://polygon-rpc.com"],
      },
      //@ts-ignore
      [BLOCKCHAIN_NAME.SOLANA]: {
        rpcList: ["https://go.getblock.io/d7fbead76a4341df810b43de05587bdf"],
      },
    },
    walletProvider,
  };

  const rubicSDK = await SDK.createSDK(configuration);

  return rubicSDK;
}

export async function InstantTrades(
  fromChain: any,
  fromToken: string,
  amount: number,
  toChain: any,
  toToken: string
) {
  const rubicSDK = await InitializeApp();

  const blockchains = {
    ETHEREUM: BLOCKCHAIN_NAME.ETHEREUM,
    POLYGON: BLOCKCHAIN_NAME.POLYGON,
    AVALANCHE: BLOCKCHAIN_NAME.AVALANCHE,
    SOLANA: BLOCKCHAIN_NAME.SOLANA,
  };

  //@ts-ignore
  const fromBlockchain = blockchains[fromChain.toUpperCase()];
  const fromTokenAddress = fromToken; // ETH
  const fromAmount = amount;
  //@ts-ignore
  const toBlockchain = blockchains[toChain.toUpperCase()];
  const toTokenAddress = toToken; // BUSD

  const wrappedTrades = await rubicSDK.crossChainManager.calculateTrade(
    { blockchain: fromBlockchain, address: fromTokenAddress },
    fromAmount,
    { blockchain: toBlockchain, address: toTokenAddress }
  );

  // console.log("NAHI", wrappedTrades);

  wrappedTrades.forEach((wrappedTrade: any) => {
    const tradeType: TradeType = wrappedTrade.type;
    console.log(`trade type: ${tradeType}`);

    if (wrappedTrade.error) {
      console.log(`hi: ${wrappedTrade.error}`);
    } else {
      const trade = wrappedTrade.trade!;
      const amount = trade.to.tokenAmount.toFormat(3);
      console.log(`result: ${amount}`);

      // explore trades info
      if (trade instanceof EvmCrossChainTrade) {
        console.log("GAS", trade.gasData);
      }
    }
  });

  return wrappedTrades;
}
