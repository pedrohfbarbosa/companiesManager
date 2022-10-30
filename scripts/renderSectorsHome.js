import { getAllCompanies, getCompaniesBySector, getSectors } from "./apiRequests.js";
import { renderCardsHome } from "./renderCardsHome.js";

export const renderSelectSectors = async () => {
  const select = document.getElementById("sectors")

  const sections = await getSectors()

  sections.forEach((e) => {
    const option = document.createElement("option")
    option.value = e
    option.innerText = e

    select.appendChild(option)
  })

  select.addEventListener("input", async (e) => {
    const value = e.target.value

    if (value == "") {
      const companies = await getAllCompanies()
      renderCardsHome(companies)
    }else {
      const companies = await getCompaniesBySector(value)
      renderCardsHome(companies)
    }
  })
}

