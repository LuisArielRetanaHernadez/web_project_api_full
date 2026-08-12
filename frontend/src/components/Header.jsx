import { useLocation, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import AppContext from "../context/ApiContext";

import logo from "../images/logo.svg"
import { getToken, removeToken } from "../utils/token";
import api from "../utils/api";

const Header = () => {
  const [data, setData] = useState({
    email: ''
  })
  const location = useLocation();

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const userInfo = async () => {
      const user = await api.getUserMe()
      setData(prev => ({ ...prev, email: user.user.email }))
    }

    if (isLoggedIn) {
      userInfo()
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    removeToken()
    setData(prev => ({ ...prev, email: '' }))
    setIsLoggedIn(false)
  }
  return (
    <header className="header page__header">
      <div className="header__navbar">
        <figure className="logo header__logo">
          <img
            className="logo__image"
            src={logo}
            alt="logo"
          />
        </figure>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {
              !isLoggedIn ? location.pathname === "/Login"
                ? <li className="header__nav-item">
                  <NavLink to={"/Register"}>Register</NavLink>
                </li>
                :
                <li className="header__nav-item">
                  <NavLink to={"/Login"}>Login</NavLink>
                </li>
                : null
            }
            {
              isLoggedIn ?
                <li className="header__nav-item">
                  <NavLink to={"/"}>{data.email}</NavLink>
                </li>
                : null
            }
            {
              isLoggedIn ?
                <li className="header__nav-item">
                  <p onClick={handleLogout} className="header__logout">Logout</p>
                </li>
                : null
            }
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Header;