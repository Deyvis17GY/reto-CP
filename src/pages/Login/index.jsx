import { GoogleOutlined } from "@ant-design/icons"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import styles from "./login.module.scss"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const navigate = useNavigate()

  const signInGoogle = async () => {
    const initAuth = await signInWithPopup(auth, provider)
    if (initAuth) {
      navigate("/candy")
    }
  }

  const isGoogle = clsx(styles.login, {
    [styles.google]: true
  })

  return (
    <div className={styles.loginCard}>
      <h2>Bienvenido al reto CP</h2>
      <div className={isGoogle} onClick={() => signInGoogle()}>
        <GoogleOutlined /> Iniciar sesión con Google
      </div>
    </div>
  )
}
