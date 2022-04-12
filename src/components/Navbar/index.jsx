import { CustomLink } from "components/CustomLink"
import React from "react"
import { useLocation } from "react-router-dom"
import styles from "./navbar.module.scss"

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    pathname !== "/login" && (
      <header className={styles.header}>
        <nav>
          <ul className={styles.nav}>
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
      </header>
    )
  )
}
