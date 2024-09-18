import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalContent = ({ children, onClose, modalRef }) => (
  <motion.div
    className="w-[90%] max-w-md flex flex-col bg-white p-6 rounded-2xl shadow-lg"
    ref={modalRef}
    variants={modalVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <button className="text-black text-xl place-self-end" onClick={onClose}>
      X
    </button>
    {children}
  </motion.div>
);

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      duration: 0.5,
      bounce: 0.3,
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    transition: { 
      type: "spring",
      duration: 0.4,
      bounce: 0,
    }
  }
};

const Modal = ({ isVisible, onClose }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const firstModalRef = useRef(null);
  const secondModalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showSecondModal && secondModalRef.current && !secondModalRef.current.contains(event.target)) {
        setShowSecondModal(false);
      } else if (isVisible && firstModalRef.current && !firstModalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSecondModal, isVisible, onClose]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModalContent onClose={onClose} modalRef={firstModalRef}>
              <button
                className="w-full h-40 border border-gray-300 rounded-xl p-3 mt-4 resize-none focus:outline-none hover:bg-gray-100"
                onClick={() => setShowSecondModal(true)}
              >
                Press this for Stacked Modal
              </button>
            </ModalContent>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecondModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModalContent onClose={() => setShowSecondModal(false)} modalRef={secondModalRef}>
              <p className="mt-4">Hello World! Random Content Random Content Random Content Random Content Random Content 
              Random Content Random Content Random Content Random Content Random Content Random Content Random Content 
              Random Content 
              </p>
            </ModalContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;