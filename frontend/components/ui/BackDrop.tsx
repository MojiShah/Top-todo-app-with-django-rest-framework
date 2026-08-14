"use client";

interface BackDropProps {
  show: boolean;
  closeBackDrop: () => void;
}

export default function BackDrop({show,closeBackDrop,}: BackDropProps) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-40 cursor-pointer bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
      onClick={closeBackDrop}
      aria-hidden="true"
    />
  );
}