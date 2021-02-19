import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <div
              className="profile__overlay"
              onClick={props.onEditAvatar}
            ></div>
          </div>
          <div className="profile__personal-data">
            <div className="profile__edit">
              <p className="profile__name">{currentUser.name}</p>
              <button
                className="edit-button"
                aria-label="Кнопка редактирования"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__activity">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="add-button"
          aria-label="Кнопка добавления"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
      {props.cards.map((elem) => {
          return (
            <Card
              key={elem._id}
              data={elem}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
