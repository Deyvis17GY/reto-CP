import { useAuth } from "context/AuthContext"
import { useFormik } from "formik"
import React, { useState, useEffect } from "react"
import { completePurchase } from "services/api"
import { popup } from "utils/popup"
import styles from "./payment.module.scss"

export const Payment = () => {
  const { user } = useAuth()

  const [total, setTotal] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = "El nombre es requerido"
    }
    if (!values.card) {
      errors.card = "Número de tarjeta es requerido"
    } else if (!/^[0-9]{14}$/.test(values.card)) {
      errors.card = "solo se aceptan números y 14 dígitos"
    }

    if (!values.dni) {
      errors.dni = "El dni es requerido"
    } else if (!/^[0-9]{8}$/.test(values.dni)) {
      errors.dni = "solo se aceptan números y 8 digitos"
    }

    if (!values.email) {
      errors.email = "El correo es requerido"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Dirección de correo inválida"
    }

    if (!values.cvv) {
      errors.cvv = "El codigo de seguridad es requerido"
    }

    if (!values.month) {
      errors.month = "El mes de vencimiento es requerido"
    }

    if (!values.year) {
      errors.year = "El año de vencimiento es requerido"
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      dni: "",
      card: "",
      month: "",
      year: "",
      cvv: ""
    },
    validate,
    onSubmit: async (values) => {
      setIsProcessing(true)
      const response = await completePurchase(JSON.stringify(values))
      if (response) {
        popup("Gracias por tu compra", user || values?.name)
        setIsProcessing(false)
      }
    }
  })

  useEffect(() => {
    setTotal(localStorage.getItem("total"))
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <div className={styles.head}>
          <h1>Resumen de compra</h1>
          <h4>S/. {total} </h4>
        </div>
      </section>
      <section className={styles.right}>
        <h1>Compra</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type='text'
            placeholder='Nombre completo'
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          {formik.errors.name ? (
            <div className={styles.errors}>{formik.errors.name}</div>
          ) : null}
          <input
            type='text'
            placeholder='Correo electronico'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className={styles.errors}>{formik.errors.email}</div>
          ) : null}
          <input
            type='text'
            maxLength={8}
            placeholder='Número de documento'
            name='dni'
            onChange={formik.handleChange}
            value={formik.values.dni}
          />

          {formik.errors.dni ? (
            <div className={styles.errors}>{formik.errors.dni}</div>
          ) : null}

          <div className={styles.formCard}>
            <h2 className={styles.subtitle}>Tarjeta de Crédito o Débito</h2>
            <input
              maxLength={14}
              placeholder='1111 2222 3333 4444'
              type='text'
              name='card'
              onChange={formik.handleChange}
              value={formik.values.card}
            />

            {formik.errors.card ? (
              <div className={styles.errors}>{formik.errors.card}</div>
            ) : null}

            <div className={styles.dateVal}>
              <select
                name='month'
                onChange={formik.handleChange}
                value={formik.values.month}
              >
                <option value='month'>Mes</option>
                <option value='1'>01</option>
                <option value='2'>02</option>
                <option value='3'>03</option>
                <option value='4'>04</option>
                <option value='5'>05</option>
                <option value='6'>06</option>
                <option value='7'>07</option>
                <option value='8'>08</option>
                <option value='9'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>

              {formik.errors.month ? (
                <div className={styles.errors}>{formik.errors.month}</div>
              ) : null}
              <select
                required
                name='year'
                onChange={formik.handleChange}
                value={formik.values.year}
              >
                <option value='year'>Año</option>
                <option value='2018'>18</option>
                <option value='2019'>19</option>
                <option value='2020'>20</option>
                <option value='2021'>21</option>
                <option value='2022'>22</option>
                <option value='2023'>23</option>
                <option value='2024'>24</option>
                <option value='2025'>25</option>
                <option value='2026'>26</option>
                <option value='2027'>27</option>
                <option value='2028'>28</option>
                <option value='2029'>29</option>
                <option value='2030'>30</option>
                <option value='2031'>31</option>
                <option value='2032'>32</option>
                <option value='2033'>33</option>
                <option value='2034'>34</option>
                <option value='2035'>35</option>
                <option value='2036'>36</option>
                <option value='2037'>37</option>
                <option value='2038'>38</option>
                <option value='2039'>39</option>
                <option value='2040'>40</option>
                <option value='2041'>41</option>
                <option value='2042'>42</option>
                <option value='2043'>43</option>
                <option value='2044'>44</option>
                <option value='2045'>45</option>
                <option value='2046'>46</option>
                <option value='2047'>47</option>
              </select>

              {formik.errors.year ? (
                <div className={styles.errors}>{formik.errors.year}</div>
              ) : null}
            </div>

            <div>
              <input
                type='password'
                maxLength='3'
                placeholder='cvv'
                name='cvv'
                onChange={formik.handleChange}
                value={formik.values.cvv}
              />

              {formik.errors.cvv ? (
                <div className={styles.errors}>{formik.errors.cvv}</div>
              ) : null}
            </div>
          </div>

          <button className={isProcessing ? styles.disabled : ""} type='submit'>
            Comprar
          </button>
        </form>
      </section>
    </main>
  )
}
