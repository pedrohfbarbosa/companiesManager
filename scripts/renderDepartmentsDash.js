import { getAllCompanies, getAllDepartments, getDepartmentsFromCompany } from "./apiRequests.js"
import { modalViewDepartment } from "./modalViewDepartment.js"

export const renderDepartments = async (departments) => {
  const departmentsWrapper = document.querySelector(".departments-wrapper")
  departmentsWrapper.innerHTML = ""

  departments.forEach(e => {
    const cardDash = document.createElement("li")
    cardDash.classList.add("card-dash")
    cardDash.insertAdjacentHTML("afterbegin", `
    <h3 class="title-2">
      ${e.name}
    </h3>
    <p class="text-3">
      ${e.description}
    </p>
    <span class="text-3">
      ${e.companies.name}
    </span>
    `)

    const divBtns = document.createElement("div")
    divBtns.classList.add("btns-card")

    const btnView = document.createElement("button")
    btnView.className = "btn-card-main btn-view"
    btnView.addEventListener("click", async () => {
      await modalViewDepartment(e)
    })

    const btnEdit = document.createElement("button")
    btnEdit.className = "btn-card-main btn-edit"

    const btnDelete = document.createElement("button")
    btnDelete.className = "btn-card-main btn-delete"

    divBtns.append(btnView, btnEdit, btnDelete)

    cardDash.appendChild(divBtns)

    departmentsWrapper.appendChild(cardDash)
  })
}

export const renderCompaniesSelect = async () => {
  const allCompanies = await getAllCompanies()

  const select = document.getElementById("select-companies")

  allCompanies.forEach(e => {
    const option = document.createElement("option")
    option.value = e.uuid
    option.innerText = e.name

    select.appendChild(option)
  })

  select.addEventListener("input", async (e) => {
    const value = e.target.value   
    const token = localStorage.getItem("token")
    
    if (value == "") {
      const departments = await getAllDepartments(token)
      await renderDepartments(departments)
    }else {
      const departments = await getDepartmentsFromCompany(token, value)
      await renderDepartments(departments)
    }
  })
}