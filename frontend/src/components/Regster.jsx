import { Link } from "react-router-dom"
import { useState } from 'react'
import { register } from "../utils/auth"
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)
    handleRegistration()
  }

  const handleRegistration = async () => {
    if (typeof data.password === String && typeof data.email === String) {
      return new Error('uno de los campos se relleno de forma incorrecta')
    }
    if (!data.email || !data.password) {
      return new Error('uno de los campos se relleno de forma incorrecta')
    }

    const response = await register(data.password, data.email)
    if (response.error) {
      return new Error(response.error.message)
    }
    navigate('/Login')
  }
  return (
    <div className="auth">
      <div className="auth__content-form">
        <h1 className="auth__title">Registrate</h1>
        <form onSubmit={handleSubmit} className="form form_display-flex-column form_bg_transparent_active">

          <div className="form__field-component auth__field-component">
            <input type="email" placeholder="Correo Electronico"
              name="email"
              id="email"
              className="form__input form__input_bg_transparent auth__form-input"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="form__field-component auth__field-component">
            <input type="password" placeholder="Contraseña"
              name="password"
              id="password"
              className="form__input form__input_bg_transparent auth__form-input"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          <button className="button button_size_width_full button_rounde_none button_font_size_md auth__button-submit">Registrate</button>
          <div className="form__footer">
            <p>Ya eres miembro? </p><Link to='/Login'>Inica session aqui</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register