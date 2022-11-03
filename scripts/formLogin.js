import { login } from "./apiRequests.js"

export const formLogin = async () => {
  const form = document.getElementById("form-login")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formElements = [...form.elements]

    const body = {}

    formElements.forEach(e => {
      if (e.name){
        body[e.name] = e.value
      }
    })

    login(body)
  })
}