"use client";

import { useEffect } from "react";

import BackDrop from "./BackDrop";

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({show,closeModal,children,title,}: ModalProps) {
  useEffect(() => {
    if (!show) return;
    function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };

  }, [show, closeModal]);

  return (
    <>
      <BackDrop show={show} closeBackDrop={closeModal} />

      <div
        className={` fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 
            rounded-2xl bg-white shadow-2xl transition-all duration-300
          ${show ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!show}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>

          <button
            type="button"
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 
            transition hover:bg-red-50 hover:text-red-500"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
}
