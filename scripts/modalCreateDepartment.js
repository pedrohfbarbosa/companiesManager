import { createDepartmentRequest, getAllCompanies, getAllDepartments, getDepartmentsFromCompany } from "./apiRequests.js"
import { renderDepartments } from "./renderDepartmentsDash.js"
import { toast } from "./toast.js"

export const modalCreateDepartment = async () => {
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
  h2.innerText = "Criar departamento"

  const form = document.createElement("form")
  form.id = "form-create-department"
  
  const inputName = document.createElement("input")
  inputName.type = "text"
  inputName.placeholder = "Nome do departamento"
  inputName.name = "name"
  inputName.required = "true"

  const inputDescription = document.createElement("input")
  inputDescription.type = "text"
  inputDescription.placeholder = "Descrição"
  inputDescription.name = "description"
  inputDescription.required = "true"

  const allCompanies = await getAllCompanies()

  const select = document.createElement("select")
  select.name = "company_uuid"
  select.setAttribute("form", "form-create-department")

  const optionDefault = document.createElement("option")
  optionDefault.value = ""
  optionDefault.innerText = "Selecionar empresa"

  select.appendChild(optionDefault)

  allCompanies.forEach((e) => {
    const option = document.createElement("option")
    option.value = e.uuid
    option.innerText = e.name

    select.appendChild(option)
  })

  const btnCreate = document.createElement("button")
  btnCreate.type = "submit"
  btnCreate.className = "color-white bg-color-brand-100"
  btnCreate.innerText = "Criar departamento"

  form.append(inputName, inputDescription, select, btnCreate)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formElements = [...form.elements]

    const body = {}

    formElements.forEach(e => {
      if (e.name){
        body[e.name] = e.value
      }
    })

    if (select.value != ""){
      const token = localStorage.getItem("token")
      
      await createDepartmentRequest(token, body)

      modalWrapper.remove()

      const selectCompany = document.getElementById("select-companies")      

      if (selectCompany.value == "") {
        const departments = await getAllDepartments(token)
        await renderDepartments(departments)
      }else {
        const departments = await getDepartmentsFromCompany(token, selectCompany.value)
        await renderDepartments(departments)
      }
    }else {
      toast("error", "Selecione a empresa")
    }
    
  })

  modal.append(btnCloseModal, h2, form)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}

export const createDepartment = async () => {
  const btnCreate = document.getElementById("btn-create-department")

  btnCreate.addEventListener("click", () => {
    modalCreateDepartment()
  })
}