import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { useAuth } from "context/AuthContext"
import React, { useEffect, useState } from "react"
import { getCandyStore } from "services/api"
import { popup } from "utils/popup"
import styles from "./candy.module.scss"

export const Candy = () => {
  const [candy, setCandy] = useState([])
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(0)

  const { user } = useAuth()

  const showCandyStore = async () => {
    const { items } = await getCandyStore()
    if (!items) return
    setCandy(items)
  }

  const defaultImage = ($event) => {
    $event.target.src =
      "https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/ItemGraphic/1244?allowPlaceHolder=true"
  }

  const incrementPrice = (price, $index) => {
    let counter = value ? value : 1
    setValue(counter + 1)
    setTotal(counter * Number(candy[$index].price))
  }

  const decrementPrice = (price, $index) => {
    setValue(value - 1)
    setTotal(value * Number(candy[$index].price))
  }

  const isZero = clsx(styles.minus, {
    [styles.zero]: value === 0
  })

  useEffect(() => {
    showCandyStore()
    if (user) {
      popup({
        user
      })
    }
  }, [user])
  return (
    <aside className={styles.general}>
      <section className={styles.containerCandy}>
        {candy.map((item, $index) => (
          <div className={styles.card} key={$index}>
            <figure>
              <img
                className={styles.figure}
                src={item.name}
                alt={item.description}
                onError={(event) => defaultImage(event)}
                loading='lazy'
              />

              <figcaption>
                <h2 className={styles.description}>{item.description}</h2>
              </figcaption>
            </figure>

            <footer className={styles.footer}>
              <MinusCircleOutlined
                onClick={() => decrementPrice(item.price, $index)}
                className={isZero}
              />
              <span className={styles.value}>{value}</span>
              <PlusCircleOutlined
                onClick={() => incrementPrice(item.price, $index)}
                className={styles.plus}
              />
              <p>S/.{item.price}</p>
            </footer>
          </div>
        ))}
      </section>
      <section className={styles.containerTotal}>
        <h2>Total</h2>
        <p>S/.{total}</p>
      </section>
    </aside>
  )
}
