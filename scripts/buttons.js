export const buttonOpenHeader = () => {
  document.getElementById("go-to-login").addEventListener("click", () => {
    window.location.replace("../login/index.html")
  })

  document.getElementById("go-to-register").addEventListener("click", () => {
    window.location.replace("../register/index.html")
  })

  const btnOpenHeader = document.getElementById("btn-open-header")

  btnOpenHeader.addEventListener("click", () => {
    const buttonsNav = document.querySelector(".btns-header")
    const header = document.querySelector("header")

    buttonsNav.classList.toggle("show")
    btnOpenHeader.classList.toggle("btn-close-header")
    header.classList.toggle("border-none")
  })
}