import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from './components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-10 flex justify-center items-center min-h-screen bg-gray-100">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleOpenModal}
      >
        Open Modal
      </button>

      <AnimatePresence>
        {showModal && <Modal isVisible={showModal} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}