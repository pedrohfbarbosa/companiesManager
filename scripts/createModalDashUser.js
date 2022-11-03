import { editUser, getUserInfo } from "./apiRequests.js"
import { userInfo } from "./userInfo.js"

export const modalEditUserDash = async (user) => {
  const token = localStorage.getItem("token")

  const body = document.querySelector("body")

  const modalWrapper = document.createElement("div")
  modalWrapper.classList.add("modal-wrapper")

  const modal = document.createElement("div")
  modal.classList.add("modal-minor")

  const btnCloseModal = document.createElement("button")
  btnCloseModal.classList.add("btn-close-modal")
  btnCloseModal.addEventListener("click", () => {
    modalWrapper.remove()
  })

  const h2 = document.createElement("h2")
  h2.classList.add("title-dash")
  h2.innerText = "Editar perfil"

  const form = document.createElement("form")
  form.id = "form-edit-user"

  const inputName = document.createElement("input")
  inputName.type = "text"
  inputName.placeholder = "Seu nome"
  inputName.name = "username"

  const inputEmail = document.createElement("input")
  inputEmail.type = "email"
  inputEmail.placeholder = "Seu email"
  inputEmail.name = "email"

  const inputPassword = document.createElement("input")
  inputPassword.type = "password"
  inputPassword.placeholder = "Sua senha"
  inputPassword.name = "password"

  const btnEdit = document.createElement("button")
  btnEdit.type = "submit"
  btnEdit.className = "color-white bg-color-brand-100"
  btnEdit.innerText = "Editar perfil"

  form.append(inputName, inputEmail, inputPassword, btnEdit)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formElements = [...form.elements]

    const body = {}
    let cont = 0
    
    formElements.forEach(e => {
      if (e.name && e.value != ""){
        body[e.name] = e.value
        cont++
      }
    })

    if (cont > 0) {
      await editUser(token, body)

      const userEdited = await getUserInfo(token)
      localStorage.setItem("user", JSON.stringify(userEdited))

      modalWrapper.remove()
      
      await userInfo()
    }else {
      alert("Altere pelo menos 1 item")
    }
    
  })

  modal.append(btnCloseModal, h2, form)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}