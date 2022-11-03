import { register } from "./apiRequests.js"

export const formRegister = async () => {
  const form = document.getElementById("form-register")

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formElements = [...form.elements]

    const body = {}
    
    formElements.forEach(e => {
      if (e.name){
        if (e.value != ""){
          body[e.name] = e.value
        }
      }
    })
    
    register(body)
  })
}