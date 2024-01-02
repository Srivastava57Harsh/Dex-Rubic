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
  // const { address } = useAccount();

  const walletProvider: WalletProvider = {
    [CHAIN_TYPE.EVM]: {
      //@ts-ignore
      address: "0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368",
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
    },
    walletProvider,
  };

  const rubicSDK = await SDK.createSDK(configuration);

  return rubicSDK;
}

export async function InstantTrades() {
  const rubicSDK = await InitializeApp();

  const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
  const fromTokenAddress = "0x3330BFb7332cA23cd071631837dC289B09C33333"; // ETH
  const fromAmount = 100;
  const toBlockchain = BLOCKCHAIN_NAME.POLYGON;
  const toTokenAddress = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"; // BUSD

  const wrappedTrades = await rubicSDK.crossChainManager.calculateTrade(
    { blockchain: fromBlockchain, address: fromTokenAddress },
    fromAmount,
    { blockchain: toBlockchain, address: toTokenAddress }
  );

  console.log("NAHI", wrappedTrades);

  wrappedTrades.forEach((wrappedTrade: any) => {
    const tradeType: TradeType = wrappedTrade.type;
    console.log(`trade type: ${tradeType}`);

    if (wrappedTrade.error) {
      console.log(`hi: ${wrappedTrade.error}`);
    } else {
      const trade = wrappedTrade.trade!;
      console.log(`result: ${trade.to.tokenAmount.toFormat(3)}`);

      // explore trades info
      if (trade instanceof EvmCrossChainTrade) {
        console.log(trade.gasData);
      }
    }
  });
}
