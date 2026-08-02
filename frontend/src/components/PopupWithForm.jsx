import { React } from 'react'

import closeImage from '../images/close.png'


const PopupWithForm = (props) => {
  return (
    <div className={`popup ${props.selector}  ${props.isOpen ? 'popup--active' : ''}`}>
      <div className="popup__card">
        <span className="icon popup__icon-close" onClick={props.onClose}>
          <img
            className="icon__image popup__icon-close-image"
            src={closeImage}
            alt="icon delete"
          />
        </span>

        <h2 className="popup__title">{props.title}</h2>

        <div className="popup__content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm