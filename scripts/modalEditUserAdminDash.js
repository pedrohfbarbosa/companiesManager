import { editUserAdminDash } from "./apiRequests.js"
import { renderAllUsers } from "./renderUsersDash.js"

export const modalEditUser = async (user) => {
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
  h2.innerText = "Editar Usuário"

  const form = document.createElement("form")
  form.id = "form-edit-user"

  const selectKindOfWork = document.createElement("select")
  selectKindOfWork.name = "kind_of_work"
  selectKindOfWork.setAttribute("form", "form-edit-user")

  const optionDefaultKindOfWork = document.createElement("option")
  optionDefaultKindOfWork.value = ""
  optionDefaultKindOfWork.innerText = "Selecionar modalidade de trabalho"

  selectKindOfWork.appendChild(optionDefaultKindOfWork)

  const kindsOfWork = ["home office", "presencial", "hibrido"]

  kindsOfWork.forEach(e => {
    const option = document.createElement("option")
    option.value = e
    option.innerText = e

    selectKindOfWork.appendChild(option)
  })

  const selectProfessionalLevel = document.createElement("select")
  selectProfessionalLevel.name = "professional_level"
  selectProfessionalLevel.setAttribute("form", "form-edit-user")

  const optionDefaultProfessional = document.createElement("option")
  optionDefaultProfessional.value = ""
  optionDefaultProfessional.innerText = "Selecionar nível profissional"

  selectProfessionalLevel.appendChild(optionDefaultProfessional)

  const professionalLevels = ["estágio", "júnior", "pleno", "sênior"]

  professionalLevels.forEach(e => {
    const option = document.createElement("option")
    option.value = e
    option.innerText = e

    selectProfessionalLevel.appendChild(option)
  })

  const btnEdit = document.createElement("button")
  btnEdit.type = "submit"
  btnEdit.className = "color-white bg-color-brand-100"
  btnEdit.innerText = "Editar"

  form.append(selectKindOfWork, selectProfessionalLevel, btnEdit)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const userId = user.uuid
    const formElements = [...form.elements]
    const body = {}
    if (selectKindOfWork.value != "" || selectProfessionalLevel.value != ""){
      formElements.forEach(elt => {
        if (elt.name && elt.value != ""){
          body[elt.name] = elt.value
        }
      })
      await editUserAdminDash(token, userId, body)

      modalWrapper.remove()

      await renderAllUsers()
    }else {
      alert("Selecione pelo menos 1 opção")
    }
  })

  modal.append(btnCloseModal, h2, form)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}