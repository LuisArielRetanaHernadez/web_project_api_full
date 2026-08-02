import closeImage from '../images/close.png'

const ImagePopup = (props) => {

  return (
    <div className={`popup popup--imagen-card ${props.selectedCard.url ? 'popup--active' : ''}`}>
      <div className="popup__content">
        <span className="icon popup__icon-close">
          <img
            className="icon__image popup__icon-close-image"
            src={closeImage}
            alt="icon delete"
            onClick={props.onClose}
          />
        </span>
        <div className="popup__content-image">
          {
            props.selectedCard && <img className="popup__image" src={props.selectedCard.url} alt='ilustrar popup' />
          }
        </div>
        <p className="popup__title"></p>
      </div>
    </div>
  )
}

export default ImagePopup