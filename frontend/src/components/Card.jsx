/* eslint-disable react/prop-types */
import deleteImage from '../images/delete.svg'

import heartImage from '../images/heart.svg'
import heartHoverImage from '../images/heart-hover.svg'
import heartActiveImage from '../images/heart-active.svg'

import { CurrentUserContext } from '../context/CurrentUserContext'
import { useContext } from 'react'

const Card = (props) => {

  const currentUser = useContext(CurrentUserContext)

  const isLiked = props.likes.some((id) => id === currentUser._id)

  const cardLikeButtonClassName = `icon card__icon-love ${isLiked && 'card__icon-love_active'}`

  const handleClick = () => {
    props.onCardClick({
      url: props.url,
      title: props.title,
      likes: props.likes
    })
  }

  return (
    <figure className="card elements__card">
      {currentUser._id === props._id &&
        <span className="icon card__icon-delete" onClick={() => props.onCardDelete(props._id)}>
          <img
            src={deleteImage}
            alt="icon delete"
            className="icon__image card__icon-delete-image"
          />
        </span>}

      <div className="card__content-image elements__photo-content-image" onClick={() => handleClick()}>
        <img className="card__image" src={props.url} alt={props.title || 'ilustract'} />
      </div>
      <figcaption className="card__about elements__photo-about">
        <p className="card__title">{props.title}</p>
        <div className="card__content-icon-and-likes">
          <span className={cardLikeButtonClassName} onClick={() => props.onCardLike({ _id: props._id, likes: props.likes })}>
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
          <span className="card__likes-count">
            {props.likes.length}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card
