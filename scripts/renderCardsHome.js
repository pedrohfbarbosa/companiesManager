export const renderCardsHome = (companies) => {
  const sectorsWrapper = document.querySelector(".sectors-wrapper-home")

  sectorsWrapper.innerHTML = ""

  companies.forEach((e) => {
    const cardHome = document.createElement("li")
    cardHome.classList.add("card-home")

    cardHome.innerHTML = `
      <h3 class="title-2">
        ${e.name}
      </h3>
      <span class="text-4">
        ${e.opening_hours}
      </span>
      <span class="text-4 span-card-rounded color-brand-100">
        ${e.sectors.description}
      </span>
    `

    sectorsWrapper.appendChild(cardHome)
  })
}