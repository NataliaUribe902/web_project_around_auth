import successIcon from "../../images/success.svg";
import errorIcon from "../../images/error.svg";

function InfoTooltip({ status, isOpen, onClosePopup }) {
  if (!isOpen) return null;
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClosePopup}
        />

        <img
          className="modal__icon"
          src={status === "success" ? successIcon : errorIcon}
          alt="icon"
        />

        <p className="popup__title">
          {status === "success"
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
