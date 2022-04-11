import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import clsx from "clsx"
import styles from "./candy.module.scss"

export const CandyFooter = ({
  item,
  addCart,
  decrementCard,
  children,
  isQuantityZero
}) => {
  const incrementPrice = () => {
    addCart()
  }

  const decrementPrice = () => {
    decrementCard()
  }

  const classMinus = clsx(styles.minus, {
    [styles.zero]: isQuantityZero
  })

  return (
    <div>
      <footer className={styles.footer}>
        <MinusCircleOutlined
          onClick={() => decrementPrice()}
          className={classMinus}
        />
        {children}
        <PlusCircleOutlined
          onClick={() => incrementPrice()}
          className={styles.plus}
        />
        <p>S/.{item.price}</p>
      </footer>
    </div>
  )
}
