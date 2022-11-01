import { deleteDepartment, getAllDepartments, getDepartmentsFromCompany } from "./apiRequests.js"
import { renderDepartments } from "./renderDepartmentsDash.js"

export const modalDeleteDepartment = async (department) => {
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
  h2.innerText = `Realmente deseja deletar o Departamento ${department.name} e demitir seus funcionários?`

  const btnDelete = document.createElement("button")
  btnDelete.className = "color-white bg-color-feedback-success btn-modal-minor text-2"
  btnDelete.innerText = "Confirmar"

  const token = localStorage.getItem("token")
  const id = department.uuid

  btnDelete.addEventListener("click", async () => {
    await deleteDepartment(token, id)

    modalWrapper.remove()

    const selectCompany = document.getElementById("select-companies")

    if (selectCompany.value == "") {
      const departments = await getAllDepartments(token)
      await renderDepartments(departments)
    } else {
      const departments = await getDepartmentsFromCompany(token, selectCompany.value)
      await renderDepartments(departments)
    }
  })

  modal.append(btnCloseModal, h2, btnDelete)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}