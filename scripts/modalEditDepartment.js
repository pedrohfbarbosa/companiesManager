import { editDepartment, getAllDepartments, getDepartmentsFromCompany } from "./apiRequests.js"
import { renderDepartments } from "./renderDepartmentsDash.js"

export const modalEditDepartment = async (department) => {
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
  h2.innerText = "Editar departamento"

  const form = document.createElement("form")

  const inputDescription = document.createElement("textarea")
  inputDescription.value = department.description
  inputDescription.placeholder = "Descrição"
  inputDescription.name = "description"
  inputDescription.required = "true"

  const btnEdit = document.createElement("button")
  btnEdit.type = "submit"
  btnEdit.className = "color-white bg-color-brand-100"
  btnEdit.innerText = "Salvar alterações"

  form.append(inputDescription, btnEdit)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    const body = { [inputDescription.name]: inputDescription.value }

    await editDepartment(token, department.uuid, body)

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

  modal.append(btnCloseModal, h2, form)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}