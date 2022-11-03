import { getAllDepartments, getAllUsers } from "./apiRequests.js";
import { modalDeleteUser } from "./modalDeleteUserAdminDash.js";
import { modalEditUser } from "./modalEditUserAdminDash.js";

export const renderAllUsers = async () => {
  const usersWrapper = document.querySelector(".users-wrapper")
  usersWrapper.innerHTML = ""

  const token = localStorage.getItem("token")

  const allUsers = await getAllUsers(token)

  const normalUsers = allUsers.filter(e => !e.is_admin)

  const allDepartments = await getAllDepartments(token) 

  normalUsers.forEach(e => {
    const department = allDepartments.find(elt => elt.uuid == e.department_uuid)

    const card = document.createElement("li")
    card.classList.add("card-dash")

    const h3 = document.createElement("h3")
    h3.classList.add("title-2")
    h3.innerText = e.username

    const p = document.createElement("p")
    p.classList.add("text-3")
    p.innerText = e.professional_level || ""

    const span = document.createElement("span")
    span.classList.add("text-3")
    if (department){
      span.innerText = department.companies.name
    }else {
      span.innerText = ""
    }

    const divBtns = document.createElement("div")
    divBtns.classList.add("btns-card")

    const btnEdit = document.createElement("button")
    btnEdit.className = "btn-card-main btn-edit"
    btnEdit.addEventListener("click", () => {
      modalEditUser(e)
    })

    const btnDelete = document.createElement("button")
    btnDelete.className = "btn-card-main btn-delete"
    btnDelete.addEventListener("click", () => {
      modalDeleteUser(e)
    })

    divBtns.append(btnEdit, btnDelete)

    card.append(h3, p, span, divBtns)

    usersWrapper.appendChild(card)
  })
}