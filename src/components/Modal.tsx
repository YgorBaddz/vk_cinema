interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="z-30 fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
        <div className="flex flex-col gap-2">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 text-white bg-[#0077FF] shadow-md shadow-black p-2 rounded-sm  hover:-translate-y-2 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
