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
  return (
    <ReactModal
      closeTimeoutMS={150}
      overlayClassName={overlayClassName}
      className={
        "my-auto box-content bg-base-200 border border-white p-5 outline-none rounded-lg drop-shadow-lg flex flex-col" +
        " " +
        className
      }
      bodyOpenClassName="overflow-hidden"
      {...props}
    >
      <div>
        <button
          className="p-3 text-xl text-gray-500"
          aria-label="Close Modal"
          onClick={props.onRequestClose}
        >
          x
        </button>
      </div>

      {props.children}
    </ReactModal>
  );
}
