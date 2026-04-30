import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;
  const { currentUser } = useContext(CurrentUserContext);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => onCardDelete(card)}
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}
