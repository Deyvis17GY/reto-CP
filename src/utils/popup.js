import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const popup = ({ user }) => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    title: `<strong>Bienvenido:</strong> ${user.displayName}`,
    html: `<img src="${user.photoURL}" alt="${user.displayName}" />`,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: "Aceptar"
  })
}
