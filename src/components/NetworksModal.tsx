import React, { useEffect, useState } from "react";
import { InstantTrades } from "../services/rubic";

const Networks = ({
  onClose,
  onTokenClick,
}: {
  onClose: () => void;
  onTokenClick: (token: any) => void;
}) => {
  const [tokenArray, setTokenArray] = useState<any[]>([]);
  const [openNetwork, setOpenNetwork] = useState<string | null>(null);

  const [dropdownVisibility, setDropdownVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchTokens = async (network: string) => {
      try {
        const response = await fetch(
          `https://tokens.rubic.exchange/api/v1/tokens/?page=1&pageSize=100&network=${network}`
        );
        if (response.ok) {
          const data = await response.json();
          return data.results;
        } else {
          console.error(`Failed to fetch tokens for ${network}`);
          return [];
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        return [];
      }
    };

    const fetchDataForNetworks = async () => {
      const networks = ["Ethereum", "Polygon", "Avalanche", "Solana"];
      const promises = networks.map((network) => fetchTokens(network));
      const results = await Promise.all(promises);
      const combinedResults = results.flat();
      setTokenArray(combinedResults);
    };

    fetchDataForNetworks();
  }, []);

  useEffect(() => {
    console.log(tokenArray);
  }, [tokenArray]);

  const toggleDropdown = (network: string) => {
    setOpenNetwork((prevOpenNetwork) =>
      prevOpenNetwork === network ? null : network
    );
  };

  const renderDropdown = (network: string) => (
    <div
      key={network}
      id={`dropdownUsers_${network}`}
      className={`z-10 ${
        openNetwork === network ? "" : "hidden"
      } bg-white rounded-lg shadow dark:bg-gray-700 mt-2 w-full overflow-hidden`}
    >
      <ul
        className="h-48 py-2  text-gray-700 dark:text-gray-200 overflow-y-scroll no-scrollbar"
        aria-labelledby={`dropdownUsersButton_${network}`}
        style={{ scrollbarWidth: "none" }}
      >
        {tokenArray
          .filter(
            (token) =>
              token.blockchainNetwork.toLowerCase() === network.toLowerCase()
          )
          .map((token: any) => (
            <li key={token.address} onClick={() => onTokenClick(token)}>
              <a
                href="#"
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img
                  className="w-6 h-6 me-2 rounded-full"
                  src={token.image}
                  alt={`${token.name} image`}
                />
                {token.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );

  const blockchainNetworks = ["Ethereum", "Polygon", "Avalanche", "Solana"];

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Networks
            </h5>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              onClick={onClose}
            >
              Close
            </a>
          </div>

          {blockchainNetworks.map((network) => (
            <div key={network}>
              <button
                id={`dropdownUsersButton_${network}`}
                className="text-white bg-slate-700 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center gap-20 text-lg w-full my-2"
                type="button"
                onClick={() => toggleDropdown(network)}
              >
                <img
                  alt={network}
                  loading="lazy"
                  width="42"
                  className="rounded-full"
                  src={`https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/${network.toLowerCase()}.svg`}
                />
                <span>{network}</span>
                <div className="">
                  <svg
                    className="w-2.5 h-2.5 ms-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>

              {renderDropdown(network)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Networks;
