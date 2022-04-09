import { getAuth } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPremiers } from "services/api"
import styles from "./home.module.scss"

export const Home = () => {
  const navigate = useNavigate()

  const [premiers, setPremiers] = useState([])

  const showPremiers = async () => {
    const { premieres } = await getPremiers()
    if (!premieres) return
    setPremiers(premieres)
  }

  const singOut = async () => {
    await getAuth().signOut()
    navigate("/login")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const defaultImage = ($event) => {
    $event.target.src =
      "https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00001271?referenceScheme=HeadOffice&allowPlaceHolder=true"
  }

  useEffect(() => {
    showPremiers()
  }, [])

  return (
    <>
      <div className={styles.containerCard}>
        {premiers.map((premier, $index) => (
          <div
            onClick={() => handleLogin()}
            className={styles.card}
            key={$index}
          >
            <img
              className={styles.figure}
              src={premier.image}
              alt={premier.description}
              onError={(event) => defaultImage(event)}
            />
            <h2 className={styles.description}>{premier.description}</h2>
          </div>
        ))}
      </div>
    </>
  )
}
