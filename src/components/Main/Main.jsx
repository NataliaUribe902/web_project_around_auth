import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/NewCard/NewCard";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  onCardClick,
  popup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit"
            type="button"
            aria-label="Editar avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
