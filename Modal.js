import React, { useState, useRef, useEffect } from "react";

const Modal = ({ isVisible, onClose }) => {
  const [inputText, setInputText] = useState("Press this for Stacked Modal");
  const [showSecondModal, setShowSecondModal] = useState(false);

  const firstModalRef = useRef(null);
  const secondModalRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showSecondModal && secondModalRef.current && !secondModalRef.current.contains(event.target)) {
        setShowSecondModal(false);
      } else if (firstModalRef.current && !firstModalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSecondModal, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      ref={wrapperRef}
    >
      <div
        className="w-full max-w-2xl flex flex-col bg-white p-6 rounded-md shadow-lg"
        ref={firstModalRef}
      >
        <button className="text-black text-xl place-self-end" onClick={onClose}>
          X
        </button>

        <button
          className="w-full h-40 border border-gray-300 rounded-md p-3 mt-4 resize-none focus:outline-none hover:bg-gray-200"
          onClick={() => setShowSecondModal(true)}
        >
          {inputText}
        </button>

        {showSecondModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          >
            <div className="w-full max-w-2xl flex flex-col bg-white p-6 rounded-md shadow-lg" ref={secondModalRef}>
              <button className="text-black text-xl place-self-end" onClick={() => setShowSecondModal(false)}>
                X
              </button>
              <p>Hello World!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;