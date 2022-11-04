import { getCoWorkers, getDepartmentUser } from "./apiRequests.js"
import { modalEditUserDash } from "./createModalDashUser.js"

export const userInfo = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const sectionInfo = document.querySelector(".user-info")
  sectionInfo.innerHTML = ""

  const h2 = document.createElement("h2")
  h2.classList.add("title-dash")
  h2.innerText = user.username

  const div = document.createElement("div")

  div.innerHTML = `
    <span class="text-1">
      ${user.email}
    </span>
    <span class="text-1">
      ${user.professional_level || ""}
    </span>
    <span class="text-1">
      ${user.kind_of_work || ""}
    </span>
  `

  const btnEdit = document.createElement("button")
  btnEdit.className = "btn-card-main btn-edit"
  btnEdit.id = "btn-edit-user-dash"

  btnEdit.addEventListener("click", async () => {
   await modalEditUserDash(user)
  })

  div.appendChild(btnEdit)

  sectionInfo.append(h2, div)
}

export const companyInfo = async () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  const companyInfo = document.querySelector(".company-info")

  companyInfo.innerHTML = ""

  if (!user.department_uuid) {
    const h3 = document.createElement("h3")
    h3.classList.add("title-1")
    h3.innerText = "Você ainda não foi contratado"

    companyInfo.appendChild(h3)
  } else {
    const allDepartments = await getDepartmentUser(token)
    const companyWorkers = await getCoWorkers(token)

    const departmentCoWorkers = companyWorkers.find(e => e.uuid == user.department_uuid)

    const coworkers = departmentCoWorkers.users

    const coworkersFilter = coworkers.filter(e => e.uuid != user.uuid)

    const departments = allDepartments.departments
    const departmentUser = departments.find(e => e.uuid == user.department_uuid)

    const sectionHired = document.createElement("div")
    sectionHired.classList.add("section-hired")

    const sectionHeader = document.createElement("div")
    sectionHeader.className = "section-header bg-color-brand-100"

    const p = document.createElement("p")
    p.className = "color-white title-dash"
    p.innerText = `${allDepartments.name} - ${departmentUser.name}`

    sectionHeader.appendChild(p)

    const ul = document.createElement("ul")

    coworkersFilter.forEach(e => {
      const li = document.createElement("li")
      li.innerHTML = `
      <h4 class="title-3">
        ${e.username}
      </h4>
      <p class="text-4">
        ${e.professional_level || ""}
      </p>
      `

      ul.appendChild(li)
    })

    sectionHired.append(sectionHeader, ul)

    companyInfo.appendChild(sectionHired)
  }

}