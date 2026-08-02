export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup--active");
  }

  close() {
    this._popup.classList.remove("popup--active");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    })

    this._popup.querySelector(".popup__icon-close").addEventListener("click", () => this.close());

    document.addEventListener("keydown", this._handleEscClose);
  }

  loading(isLoading = false) {
    console.log('is Loading ', isLoading)
    if (isLoading) {
      this._popup.querySelector('.popup__button-submit').textContent = 'cargando...';
    } else {
      this._popup.querySelector('.popup__button-submit').textContent = 'Guardar yaya';
    }
  }
}