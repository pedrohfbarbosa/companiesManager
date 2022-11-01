import { deleteUser } from "./apiRequests.js"
import { renderAllUsers } from "./renderUsersDash.js"

export const modalDeleteUser = async(user) => {
  const body = document.querySelector("body")

  const modalWrapper = document.createElement("div")
  modalWrapper.classList.add("modal-wrapper")

  const modal = document.createElement("div")
  modal.className = "modal-minor modal-minor-edit"

  const btnCloseModal = document.createElement("button")
  btnCloseModal.classList.add("btn-close-modal")
  btnCloseModal.addEventListener("click", () => {
    modalWrapper.remove()
  })

  const h2 = document.createElement("h2")
  h2.classList.add("title-dash")
  h2.innerText = `Realmente deseja deletar o Usuário ${user.username}?`

  const btnDelete = document.createElement("button")
  btnDelete.className = "color-white bg-color-feedback-success btn-modal-minor text-2"
  btnDelete.innerText = "Deletar"

  const token = localStorage.getItem("token")
  const id = user.uuid

  btnDelete.addEventListener("click", async () => {
    await deleteUser(token, id)

    modalWrapper.remove()

    await renderAllUsers()
  })

  modal.append(btnCloseModal, h2, btnDelete)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}