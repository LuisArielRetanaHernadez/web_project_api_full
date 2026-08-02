import { useRef } from "react"

import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = (props) => {

  const avatarRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onUpdateAvatar({ avatar: avatarRef.current.value })
    props.onClose()
  }


  return (
    <PopupWithForm
      title="Actualizar tu perfil" selector=".popup--upload-avatar-user-me" isOpen={props.isOpen} onClose={props.onClose}
    >
      <form className="form popup__form" action="" onSubmit={handleSubmit}>
        <div className="form__field-component">
          <input
            className="form__input popup__form-input"
            id="input-profile-url-image"
            name="avatar"
            type="url"
            required
            ref={avatarRef}
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
    </PopupWithForm>
  )
}

export default EditAvatarPopup