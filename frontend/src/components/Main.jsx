import api from "../utils/api.js"

// images
import plusImage from '../images/plus.svg'
import diagonalImage from '../images/diagonal.svg'
import diagonalHoverImage from '../images/diagonal-hover.svg'
import penImage from '../images/pen.svg'
import deleteImage from '../images/delete.svg'
import heartImage from '../images/heart.svg'
import heartHoverImage from '../images/heart-hover.svg'
import heartActiveImage from '../images/heart-active.svg'
import closeImage from '../images/close.png'
import { useContext } from "react"
import Card from "./Card.jsx"

import { CurrentUserContext } from "../context/CurrentUserContext.js"


const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) => {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile content__seccion">
        <div className="profile__content-image" onClick={onEditAvatarClick}>
          <div className="profile__image-update-content">
            <span className="icon">
              <img
                className="icon__image"
                src={penImage}
                alt='icon'
              />
            </span>
          </div>
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="avatar user me"
          />
        </div>

        <div className="profile__about">
          <div className="profile__content-username-button">
            <span className="button profile__button-update-profile" onClick={onEditProfileClick}>
              <img
                className="profile__button-update-profile-image profile__button-update-profile-image_hidden-hover"
                src={diagonalImage}
                alt="icon diagonal"
              />
              <img
                className="profile__button-update-profile-image profile__button-update-profile-image_show-hover"
                src={diagonalHoverImage}
                alt="icon diagonal hover"
              />
            </span>
            <p className="profile__name">{currentUser?.name}</p>
          </div>

          <p className="profile__state">{currentUser?.about}</p>
        </div>

        <button className="button profile__button-add-target" onClick={onAddPlaceClick}>
          <img
            className="profile__button-add-target-image"
            src={plusImage}
            alt="icon plus"
          />
        </button>
      </section>
      <section className="elements content__seccion">
        <div className="elements__cards">
          {/* <!-- Card --> */}
          {cards?.length > 0 && cards.map((card, index) => (
            <Card key={card._id} _id={card._id} title={card.name} url={card.link} likes={card.likes} isLikes={false} IdOnwer={card.owner} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </div>
        <template id="template-card">
          <figure className="card elements__card">
            <span className="icon card__icon-delete">
              <img
                src={deleteImage}
                alt='delete icon'
                className="icon__image card__icon-delete-image"
              />
            </span>
            <div className="card__content-image elements__photo-content-image">
              <img className="card__image" alt='ilustra card' />
            </div>
            <figcaption className="card__about elements__photo-about">
              <p className="card__title"></p>
              <div className="card__content-icon-and-likes">
                <span className="icon card__icon-love">
                  <img
                    className="card__icon-love-image card__icon-love-image_standar"
                    src={heartImage}
                    alt="icon love"
                  />
                  <img
                    className="card__icon-love-image card__icon-love-image_hover"
                    src={heartHoverImage}
                    alt="icon love hover"
                  />
                  <img
                    className="card__icon-love-image card__icon-love-image_active"
                    src={heartActiveImage}
                    alt="icon love active"
                  />
                </span>
                <span className="card__likes-count"></span>
              </div>
            </figcaption>
          </figure>
        </template>
      </section>
      {/* <!-- Popup to open the create card form --> */}
      <div className="popup popup--create-card">
        <div className="popup__card">
          <span className="icon popup__icon-close">
            <img
              className="icon__image popup__icon-close-image"
              src={closeImage}
              alt="icon delete"
            />
          </span>
          <h2 className="popup__title">Agrega una tarjeta</h2>
          <div className="popup__content">
            <form className="form popup__form" action="">
              <div className="form__field-component">
                <input
                  type="text"
                  id="input-profile-name"
                  className="form__input popup__form-input"
                  name="title"
                  required
                  minLength="2"
                  maxLength="30"
                  placeholder="title"
                />
                <span
                  className="form__error-message"
                  id="input-profile-name-error"
                ></span>
              </div>

              <div className="form__field-component">
                <input
                  className="form__input popup__form-input"
                  id="input-profile-url-image"
                  name="url"
                  required
                  placeholder="url"
                  type="url"
                />
                <span
                  className="form__error-message"
                  id="input-profile-url-image-error"
                ></span>
              </div>

              <button
                className="button form__button-submit popup__button-submit"
                id="button-update-profile"
                type="submit"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Popup to open the update profile form --> */}


      {/* <!-- Popup to open the imagen of selected card --> */}
      <div className="popup popup--imagen-card">
        <div className="popup__content">
          <span className="icon popup__icon-close">
            <img
              className="icon__image popup__icon-close-image"
              src={closeImage}
              alt="icon delete"
            />
          </span>
          <div className="popup__content-image">
            <img className="popup__image" alt='ilustrar popup' />
          </div>
          <p className="popup__title"></p>
        </div>
      </div>

      {/* <!-- popup update image user me --> */}

      <div className="popup popup--upload-avatar-user-me">
        <div className="popup__card">
          <span className="icon popup__icon-close">
            <img
              className="icon__image popup__icon-close-image"
              src={closeImage}
              alt="icon delete"
            />
          </span>
          <h2 className="popup__title">Cambiar foto de perfil</h2>
          <div className="popup__content">
            <form className="form popup__form" action="">
              <div className="form__field-component">
                <input
                  className="form__input popup__form-input"
                  id="input-profile-url-image"
                  name="avatar"
                  type="url"
                  required
                />
                <span
                  className="form__error-message"
                  id="input-profile-url-image-error"
                ></span>
              </div>

              <button
                className="button form__button-submit popup__button-submit"
                id="button-update-profile"
                type="submit"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- popup confirm delete card --> */}
      <div className="popup popup--delete-card">
        <div className="popup__card">
          <span className="icon popup__icon-close">
            <img
              className="icon__image popup__icon-close-image"
              src={closeImage}
              alt="icon delete"
            />
          </span>
          <h2 className="popup__title">¿Estás seguro?</h2>
          <div className="popup__content">
            <button className="button popup__button popup__button-confirm">
              Si
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main