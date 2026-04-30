import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        type="url"
        ref={avatarRef}
      />
      <span className="popup__error avatar-error"></span>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
