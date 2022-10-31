import { getAllDepartments } from "../../scripts/apiRequests.js";
import { buttonsListener } from "../../scripts/buttons.js";
import { security } from "../../scripts/security.js";
import { renderCompaniesSelect, renderDepartments } from "../../scripts/renderCompaniesDash.js"

security()

buttonsListener()

await renderCompaniesSelect()

await renderDepartments(await getAllDepartments(localStorage.getItem("token")))