/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    iconColor: "#c9556b",
    text: message,
    showConfirmButton: false,
    customClass: {
      popup: "cosmetics-swal-popup",
      title: "cosmetics-swal-title",
    },
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    iconColor: "#3fae6a",
    title: msg,
    showConfirmButton: false,
    timer: duration,
    background: "#ffffff",
    color: "#140342",
    customClass: {
      popup: "cosmetics-swal-popup",
      title: "cosmetics-swal-title",
    },
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#140342",
    iconColor: "#3fae6a",
    customClass: {
      popup: "cosmetics-swal-popup",
      title: "cosmetics-swal-title",
    },
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    iconColor: "#c9556b",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
    confirmButtonColor: "#140342",
    customClass: {
      popup: "cosmetics-swal-popup",
      title: "cosmetics-swal-title",
    },
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
