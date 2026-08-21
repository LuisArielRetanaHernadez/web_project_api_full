import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../utils/auth"
import AppContext from "../context/ApiContext"

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { setIsLoggedIn, setToken } = useContext(AppContext)

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)
    handleLogin()
  }

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return
    }

    const response = await login(data.password, data.email)

    if (response.error) {
      return new Error(response.error.message)
    }
    if (response.token) {
      if (setToken) setToken(response.token)
      setIsLoggedIn(true)
    }
  }
  return (
    <div className="auth">
      <div className="auth__content-form">
        <h2 className="auth__title">Inicar Session</h2>
        <form onSubmit={handleSubmit} className="form form_display-flex-column form_bg_transparent_active ">

          <div className="form__field-component auth__field-component">
            <input type="email" placeholder="Correo Electronico"
              name="email"
              id="email"
              className="form__input form__input_bg_transparent auth__form-input"
              value={data.email}
              onChange={handleChange} />
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

          <button className="button button_size_width_full button_rounde_none button_font_size_md auth__button-submit ">Iniciar Session</button>
          <div className="form__footer">
            <p>Aun no eres miembro? </p><Link to='/Register'>Registrate aqui</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login