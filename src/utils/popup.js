import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const popup = (title, user?) => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    title: `<strong>${title}</strong> ${user ? user?.displayName : ""}`,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: "Aceptar"
  })
}
