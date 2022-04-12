import { LogoutOutlined } from "@ant-design/icons"
import { CustomLink } from "components/CustomLink"
import { getAuth } from "firebase/auth"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./navbar.module.scss"

export const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const logoutAuth = async () => {
    getAuth()
      .signOut()
      .then(() => navigate("/"))
  }

  return (
    pathname !== "/login" && (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <CustomLink to='/'>Home</CustomLink>
            </li>
            <li>
              <CustomLink to='/candy'>Candy</CustomLink>
            </li>
            <li>
              <CustomLink to='/login'>Login</CustomLink>
            </li>
          </ul>
        </nav>
        <LogoutOutlined
          className={styles.logout}
          onClick={() => logoutAuth()}
        />
      </header>
    )
  )
}
