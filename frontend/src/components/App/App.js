import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import api from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltop";
import ShowOk from "../ShowOk/ShowOk";
import ShowErr from "../ShowErr/ShowErr";
import * as auth from "../../auth/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    card: {},
  });

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [isShowTooltipOk, setIsShowTooltipOk] = React.useState(false);
  const [isShowTooltipErr, setIsShowTooltipErr] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData(res.data);
          setLoggedIn(true);
          history.push("/main");
        }
        if (res.statusCode === 400) {
          throw new Error("Токен не передан или передан не в том формате");
        }
        if (res.statusCode === 401) {
          throw new Error("Переданный токен некорректен ");
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((el) => el._id === currentUser._id);
    if (isLiked) {
      api
        .removeLike(card._id)
        .then((result) => {
          const newCards = cards.map((item) => {
            return item._id === card._id ? result : item;
          });
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .setLike(card._id)
        .then((result) => {
          const newCards = cards.map((item) => {
            return item._id === card._id ? result : item;
          });
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((result) => {
        const newCard = cards.filter((item) => {
          return item._id !== card._id;
        });
        setCards(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, card: card });
  }

  function closeAllPopups(evt) {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsShowTooltipOk(false);
    setIsShowTooltipErr(false);
    setSelectedCard({ isOpen: false, card: {} });
  }

  function handleUpdateUser(data) {
    api
      .dispatchProfileInfo(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createNewCard(data)
      .then((result) => {
        setCards([result, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleSubmitOnRegister(email, password) {
    return auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode === 400) {
          throw new Error("некорректно заполнено одно из полей ");
        }
        setUserData(res.data);
        setIsShowTooltipOk(true);
        history.push("/signin");
      })
      .catch((err) =>{
        setIsShowTooltipErr(true);
         console.log(err)
      });
  }

  function handleSubmitOnAuthorize(email, password) {
    return auth.authorize(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/main");
        return res;
      }
      if (res.statusCode === 400) {
        throw new Error("некорректно заполнено одно из полей ");
      }
      if (res.statusCode === 401) {
        throw new Error("пользователь с email не найден ");
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  function handleOute() {
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userData={userData} onSignin={handleOute} />
        <Switch>
          <Route path="/signin">
            <Login onAuthorize={handleSubmitOnAuthorize} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleSubmitOnRegister} />
          </Route>
          <ProtectedRoute
            exact
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <ImagePopup data={selectedCard} isClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isShowTooltipOk}
          onClose={closeAllPopups}
          children={<ShowOk />}
        />
        <InfoTooltip
          isOpen={isShowTooltipErr}
          onClose={closeAllPopups}
          children={<ShowErr />}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
