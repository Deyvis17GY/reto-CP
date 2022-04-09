import axios from "axios"

export const getPremiers = async () => {
  const response = await axios.get(
    "http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/premieres"
  )

  const { premieres } = await response.data

  return {
    premieres
  }
}

export const getCandyStore = async () => {
  const response = await axios.get(
    "http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/candystore"
  )

  const { items } = await response.data

  return {
    items
  }
}
