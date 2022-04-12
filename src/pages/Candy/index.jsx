import clsx from "clsx"
import { CandyFooter } from "components/CandyFooter"
import { useAuth } from "context/AuthContext"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCandyStore } from "services/api"
import { popup } from "utils/popup"
import styles from "./candy.module.scss"

export const Candy = () => {
  const [candy, setCandy] = useState([])

  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  const navigate = useNavigate()

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

  const actualQuantity = (id) => cart.find((item) => item.id === id)?.quantity

  const continuePurchase = () => {
    if (cart.length === 0) {
      popup("No hay productos seleccionados")
    } else {
      localStorage.setItem("total", total)
      navigate("/payment")
    }
  }

  useEffect(() => {
    showCandyStore()
    if (user) {
      popup("Bienvenido:", user)
    }
    return () => {
      setCandy([])
      setTotal(0)
      setCart([])
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
        <button className={styles.continue} onClick={() => continuePurchase()}>
          Continuar
        </button>
      </section>
    </aside>
  )
}
