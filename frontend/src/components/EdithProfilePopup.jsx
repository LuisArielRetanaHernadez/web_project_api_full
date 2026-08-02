import { useState, useEffect, useContext } from 'react';

// Context
import { CurrentUserContext } from "../context/CurrentUserContext";

// Popup
import PopupWithForm from "./PopupWithForm";


const EdithProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");



  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });

    props.onUpdateUser({
      name,
      about: description,
    })

    props.onClose();
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      selector=".popup--update-profile"
      title="Actualizar tu perfil"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form className="form popup__form" action="" onSubmit={handleSubmit}>
        <div className="form__field-component">
          <input
            className="form__input popup__form-input"
            id={`input-profile-name`}
            name="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
            minlength="7"
            maxlength="15"
          />
          <span
            className="form__error-message"
            id={`input-profile-name-error`}
          ></span>
        </div>

        <div className="form__field-component">
          <input
            className="form__input popup__form-input"
            id={`input-profile-state`}
            name="state"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            required
            minlength="7"
            maxlength="15"
            type="text"
          />
          <span
            className="form__error-message"
            id={`input-profile-state-error`}
          ></span>
        </div>

        <button
          className="button form__button-submit popup__button-submit"
          id={`button-update-profile`}
          type="submit"
        >
          Guardar
        </button>
      </form>
    </PopupWithForm>
  );
};

export default EdithProfilePopup