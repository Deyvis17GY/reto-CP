import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { CandyFooter } from "components/CandyFooter"
import { useAuth } from "context/AuthContext"
import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { getCandyStore } from "services/api"
import { popup } from "utils/popup"
import styles from "./candy.module.scss"

export const Candy = () => {
  const [candy, setCandy] = useState([])
  const [isZero, setIsZero] = useState(true)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  const [value, setValue] = useState(0)

  const valueQuantity = useRef(null)

  const { user } = useAuth()

  const showCandyStore = async () => {
    const { items } = await getCandyStore()
    const newItems = items.map((item, index) => ({ id: index, ...item }))
    if (!items) return

    setCandy(newItems)
  }

  const defaultImage = ($event) => {
    $event.target.src =
      "https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/ItemGraphic/1244?allowPlaceHolder=true"
  }

  const totalProducts = (item) => {
    let itemInCart2 = cart.find((itemInCart) => itemInCart.id === item.id)
    if (itemInCart2) {
      const newQuantity = itemInCart2.quantity + 1
      const newCart = cart.map((itemInCart) => {
        if (itemInCart.id === item.id) {
          return { id: itemInCart.id, quantity: newQuantity }
        } else {
          return itemInCart
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, { id: item.id, quantity: 1 }])
    }

    const totalAmount = total + parseFloat(item.price)
    setTotal(() => Math.round(totalAmount * 100) / 100)
  }

  const decrementTotal = (item) => {
    const itemInCart2 = cart.find((itemInCart) => itemInCart.id === item.id)
    if (itemInCart2.quantity === 1) {
      const newCart = cart.filter((itemInCart) => itemInCart.id !== item.id)
      setCart(newCart)
    } else {
      const newQuantity = itemInCart2.quantity - 1
      const newCart = cart.map((itemInCart) => {
        if (itemInCart.id === item.id) {
          return { id: itemInCart.id, quantity: newQuantity }
        } else {
          return itemInCart
        }
      })
      setCart(newCart)
    }
    const totalAmount = total - parseFloat(item.price)
    setTotal(totalAmount)
  }

  const validateZero = clsx(styles.minus, {
    [styles.zero]: isZero
  })

  const actualQuantity = (id) => cart.find((item) => item.id === id)?.quantity

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

              {item.id}
            </figure>

            {/* <footer className={styles.footer}>
              <MinusCircleOutlined
                onClick={() => decrementTotal(item)}
                className={
                  actualQuantity(item.id) === undefined
                    ? validateZero
                    : styles.minus
                }
              />
              <span ref={valueQuantity} className={styles.value}>
                {" "}
                {actualQuantity(item.id) || 0}
              </span>
              <PlusCircleOutlined
                onClick={() => totalProducts(item)}
                className={styles.plus}
              />
              <p>S/.{item.price}</p>
            </footer> */}

            <CandyFooter
              item={item}
              addCart={() => totalProducts(item)}
              decrementCard={() => decrementTotal(item)}
              isQuantityZero={
                actualQuantity(item.id) === undefined ? true : false
              }
            >
              {" "}
              {actualQuantity(item.id) || 0}
            </CandyFooter>
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
