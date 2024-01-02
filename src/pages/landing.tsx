import { ConnectButton } from "@rainbow-me/rainbowkit";
import Networks from "../components/NetworksModal";
import { useState } from "react";

export default function Landing() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-2 md:px-6">
          <header className="mb-4 flex items-center justify-between py-4 md:py-8">
            <div className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
              Test-Swap
            </div>

            <div className="flex items-center space-x-3">
              <ConnectButton />
            </div>
          </header>

          <section>
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Test Swap
              </h5>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 text-2xl font-bold text">
                <div className="">
                  <div className=" bg-slate-700 p-4 rounded-2xl mb-5 sm:mb-0">
                    <div className="flex">
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={handleOpenPopup}
                      >
                        <img
                          src="https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg"
                          alt="bt-image"
                          className="w-[50px] h-[50px] max-h-[50px] rounded-[100px]"
                        />
                        <img
                          src="https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg"
                          alt="bt-image"
                          className="w-[35px] h-[35px] max-h-[35px] rounded-[100px] -mt-[15px] ml-[20px]"
                        />
                      </div>
                      <div className="flex flex-col justify-center -mt-[15px]">
                        <span className="font-bold text-lg text-white -ml-[22px]">
                          Coin name
                        </span>
                        <span className="font-normal text-xl text-slate-400 ml-[15px]">
                          Network name
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center">
                    <img
                      alt="arrow"
                      loading="lazy"
                      width="50"
                      height="50"
                      decoding="async"
                      data-nimg="1"
                      className="rounded-full -mt-4 xl:mt-12"
                      src="/swap.png"
                    />
                  </div>
                </div>

                <div className="">
                  <div className=" bg-slate-700 p-4 rounded-2xl mb-5 sm:mb-0">
                    <div className="flex">
                      <div className="flex flex-col ">
                        <img
                          src="https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg"
                          alt="bt-image"
                          className="w-[50px] h-[50px] max-h-[50px] rounded-[100px]"
                        />
                        <img
                          src="https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg"
                          alt="bt-image"
                          className="w-[35px] h-[35px] max-h-[35px] rounded-[100px] -mt-[15px] ml-[20px]"
                        />
                      </div>
                      <div className="flex flex-col justify-center -mt-[15px]">
                        <span className="font-bold text-lg text-white -ml-[22px]">
                          Coin name
                        </span>
                        <span className="font-normal text-xl text-slate-400 ml-[15px]">
                          Network name
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Networks onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </>
  );
}
