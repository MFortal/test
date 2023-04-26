import { useRouter } from "next/router";
import Popup from "reactjs-popup";

export const CustomPopup = ({ stateModal, setStateModal }) => {
  const router = useRouter();

  const closeModal = () => {
    setStateModal({ open: false });
    router.push(stateModal?.path ?? "/");
  };

  return (
    <Popup open={stateModal?.open} closeOnDocumentClick onClose={closeModal}>
      <div
        className={`modal_technical_support ${
          stateModal?.success ? "" : "modal_technical_support_error"
        }`}
      >
        <a className="close" onClick={closeModal}>
          &times;
        </a>
        <span className="technical_support__title">{stateModal?.heading}</span>
        <p className="private_policy">{stateModal?.message}</p>
      </div>
    </Popup>
  );
};
