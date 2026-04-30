import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import api from "../utils/api";
import ImagePopup from "./Main/components/ImagePopup/ImagePopup";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.log("Error al actualizar avatar:", err));
  };
  function handleCardLike(card) {
    const isLiked = card.isLiked;

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((error) => console.error(error));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((error) => console.error(error));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  const handleAddCard = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((err) => console.error("Error en API addCard:", err));
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  function handleOpenImagePopup(card) {
    setPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }
  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddCard,
        }}
      >
        <Header></Header>
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardClick={handleOpenImagePopup}
          popup={popup}
        ></Main>
        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
