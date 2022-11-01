import { allUnemployed, fireEmployee, getAllDepartments, getAllUsers, hireEmployee } from "./apiRequests.js"

export const createUserCardModal = async (user) => {
  const allDepartments = await getAllDepartments(localStorage.getItem("token"))

  const department = allDepartments.find(elt => elt.uuid == user.department_uuid)

  const card = document.createElement("li")
  card.classList.add("card-employee")

  const h4 = document.createElement("h4")
  h4.classList.add("title-2")
  h4.innerText = user.username

  const p = document.createElement("p")
  p.classList.add("text-3")
  p.innerText = user.professional_level || ""

  const span = document.createElement("span")
  span.classList.add("text-3")
  if (department){
    span.innerText = department.companies.name
  }else {
    span.innerText = ""
  }

  const btnFire = document.createElement("button")
  btnFire.className = "btn-default color-feedback-alert text-2 bg-color-white"
  btnFire.innerText = "Desligar"

  btnFire.addEventListener("click", async (e) => {    
    await fireEmployee(localStorage.getItem("token"), user.uuid)

    card.parentElement.parentElement.parentElement.remove()
  })

  card.append(h4, p, span, btnFire)

  return card
}

export const createModalHeader = async (department) => {
  const modalHeader = document.createElement("div")
  modalHeader.classList.add("modal-header")

  const div = document.createElement("div")
  div.innerHTML = `
    <p class="title-2">
      ${department.description}
    </p>
    <span class="text-3">
      ${department.companies.name}
    </span>
  `

  const form = document.createElement("form")
  form.id = "form-users"

  const select = document.createElement("select")
  select.className = "text-3 color-grey-200"
  select.name = "select-users"
  select.id = "select-users"
  select.setAttribute("form", "form-users") 

  const optionDefault = document.createElement("option")
  optionDefault.value = ""
  optionDefault.innerText = "Selecionar usuário"

  select.appendChild(optionDefault)

  const unemployed = await allUnemployed(localStorage.getItem("token"))

  unemployed.forEach(e => {
    const option = document.createElement("option")
    option.value = e.uuid
    option.innerText = e.username

    select.appendChild(option)
  })

  const btnSubmit = document.createElement("button")
  btnSubmit.className = "btn-default bg-color-feedback-success color-white text-2 border-none"
  btnSubmit.type = "submit"
  btnSubmit.innerText = "Contratar"

  form.append(select, btnSubmit)

  form.addEventListener("submit", async(e) => {
    e.preventDefault()
    const body = {department_uuid: department.uuid}
    if (select.value != ""){
      body["user_uuid"] = select.value

      await hireEmployee(body, localStorage.getItem("token"))

      modalHeader.parentElement.parentElement.remove()
    }    
  })

  modalHeader.append(div, form)

  return modalHeader
}

export const modalViewDepartment = async (department) => {
  const allUsers = await getAllUsers(localStorage.getItem("token"))

  const usersFromDepartment = allUsers.filter(e => e.department_uuid == department.uuid)

  const body = document.querySelector("body")

  const modalWrapper = document.createElement("div")
  modalWrapper.classList.add("modal-wrapper")

  const modal = document.createElement("div")
  modal.classList.add("modal")

  const btnCloseModal = document.createElement("button")
  btnCloseModal.classList.add("btn-close-modal")
  btnCloseModal.addEventListener("click", () => {
    modalWrapper.remove()
  })

  const h2 = document.createElement("h2")
  h2.classList.add("title-dash")
  h2.innerText = department.name

  const modalHeader = await createModalHeader(department)

  const employees = document.createElement("ul")
  employees.classList.add("department-employees")

  usersFromDepartment.forEach(async (e) => {
    employees.appendChild(await createUserCardModal(e))
  })

  modal.append(btnCloseModal, h2, modalHeader, employees)

  modalWrapper.appendChild(modal)

  body.appendChild(modalWrapper)
}