import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ImagePopup from "./Main/components/ImagePopup/ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    auth
      .getContent(token)
      .then((res) => {
        const user = res.data;
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error("Token inválido:", err);
      });
  }, []);
  useEffect(() => {
    if (!loggedIn) return;

    api.getCards().then(setCards).catch(console.log);
    api.getUserInfo().then(setCurrentUser).catch(console.log);
  }, [loggedIn]);
  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        navigate("/signin");
        openSuccessPopup();
      })
      .catch((err) => {
        console.error(err);
        openErrorPopup();
      });
  };
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);

          return auth.getContent(data.token);
        }
      })
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        navigate("/");
      });
  };

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
    setIsInfoTooltipOpen(false);
  }
  function handleOpenImagePopup(card) {
    setPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }
  function openSuccessPopup() {
    setTooltipStatus("success");
    setIsInfoTooltipOpen(true);
  }

  function openErrorPopup() {
    setTooltipStatus("error");
    setIsInfoTooltipOpen(true);
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
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
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
                </>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin}></Login>}
          ></Route>
          <Route
            path="/signup"
            element={
              <Register handleRegistration={handleRegistration}></Register>
            }
          ></Route>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/"></Navigate>
              ) : (
                <Navigate to="/signin"></Navigate>
              )
            }
          ></Route>
        </Routes>
        <InfoTooltip
          status={tooltipStatus}
          isOpen={isInfoTooltipOpen}
          onClosePopup={handleClosePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
