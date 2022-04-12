import clsx from "clsx"
import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import styles from "./link.module.scss"
export const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, exact: true })
  const routerClass = clsx(styles.router, {
    [styles.linkActive]: match
  })

  return (
    <div>
      <Link className={routerClass} to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}
