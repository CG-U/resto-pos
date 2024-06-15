import ReactModal from "react-modal";

export interface ModalProps extends ReactModal.Props {
  isOpen: boolean;
  children?: React.ReactNode;
}

ReactModal.setAppElement("body");

export function Modal({
  overlayClassName = "bg-gray-900/25 backdrop-blur-sm inset-0 fixed overflow-y-scroll flex flex-col items-center z-50 ",
  className = "",

  ...props
}: ModalProps) {
  const defaultClassName =
    "my-auto box-content bg-white p-5 outline-none rounded-md";

  return (
    <ReactModal
      closeTimeoutMS={150}
      overlayClassName={overlayClassName}
      className={defaultClassName + " " + className}
      bodyOpenClassName="overflow-hidden"
      {...props}
    >
      <button
        className="p-3 text-xl text-gray-500"
        aria-label="Close Modal"
        onClick={props.onRequestClose}
      >
        x
      </button>

      {props.children}
    </ReactModal>
  );
}
