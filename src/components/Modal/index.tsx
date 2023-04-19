import React, { useEffect, useState } from "react";
type TProps = {
  children: any;
  isopenmodal: boolean;
  setIsopenModal: (isopenmodal: boolean) => void;
};
const ModalContent: React.FC<TProps> = ({
  children,
  isopenmodal,
  setIsopenModal,
}) => {
  // const [isopenmodal, setIsopenModal] = useState<boolean>(true);
  useEffect(() => {
    const handleCloseModal = () => {
      setIsopenModal(false);
    };
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, []);
  return (
    <>
      <div>
        <div
          id="popup-modal"
          tabIndex={-1}
          style={{ backgroundColor: `rgba(0,0,0,0.5)` }}
          className={`fixed top-0 left-0 right-0 z-[100] ${
            isopenmodal ? "flex" : "hidden"
          }  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-full m-auto"
          >
            <div className="relative bg-third p-3 rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setIsopenModal(!isopenmodal)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="text-text">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalContent;
