export const buttonOpenHeader = () => {
  const goToLogin = [...document.querySelectorAll(".go-to-login")]
  if (goToLogin){
    goToLogin.forEach(e => {
      e.addEventListener("click", () => {
        window.location.replace("../login/index.html")
      })
    })
  }

  const goToRegister = [...document.querySelectorAll(".go-to-register")]
  if(goToRegister){
    goToRegister.forEach(e => {
      e.addEventListener("click", () => {
        window.location.replace("../register/index.html")
      })
    })
  }

  const goToHome = [...document.querySelectorAll(".go-to-home")]
  if (goToHome){
    goToHome.forEach(e => {
      e.addEventListener("click", () => {
        window.location.replace("../home/index.html")
      })
    })
  }

  const btnOpenHeader = document.getElementById("btn-open-header")

  btnOpenHeader.addEventListener("click", () => {
    const buttonsNav = document.querySelector(".btns-header")
    const header = document.querySelector("header")

    buttonsNav.classList.toggle("show")
    btnOpenHeader.classList.toggle("btn-close-header")
    header.classList.toggle("border-none")
  })
}