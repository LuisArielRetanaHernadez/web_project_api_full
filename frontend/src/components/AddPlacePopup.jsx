import PopupWithForm from "./PopupWithForm"

const AddPlacePopup = (props) => {

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault()

    const title = e.target.title.value
    const url = e.target.url.value

    props.onAddPlaceSubmit({ title, url })

    e.target.reset()

    props.onClose()
  }

  return (
    <PopupWithForm
      selector=".popup--create-card"
      title="Nuevo lugar"
      buttonText="Crear"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form className="form popup__form" action="" onSubmit={handleAddPlaceSubmit}>
        <div className="form__field-component">
          <input
            type="text"
            id="input-profile-name"
            className="form__input popup__form-input"
            name="title"
            required
            minlength="2"
            maxlength="30"
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
    </PopupWithForm>
  )
}

export default AddPlacePopup