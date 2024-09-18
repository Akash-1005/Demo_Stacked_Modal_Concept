import React, { useState, useRef, useEffect } from "react";

import Modal from './components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSecondModal(false); // Close the second modal if it's open
  };

  return (
    <div className="p-10 text-center">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
        onClick={handleOpenModal}
      >
        Open Modal
      </button>

      {showModal && <Modal isVisible={showModal} onClose={handleCloseModal} />}
    </div>
  );
}