import React from "react"
import { Link, useLocation } from "react-router-dom"

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    pathname !== "/login" && (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link to='/'> Home </Link>
          <Link to='candy'> Candy </Link>
          <Link to='login'> Login </Link>
        </nav>
      </div>
    )
  )
}
