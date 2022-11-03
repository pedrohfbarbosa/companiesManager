export const toast = (type, message) => {
  const body = document.querySelector("body")

  const toast =  document.createElement("div")
  toast.classList.add("toast")

  const h4 = document.createElement("h4")
  h4.className = "text-2 color-white"
  h4.innerText = message

  toast.appendChild(h4)

  if (type == "success") {
    toast.classList.add("bg-color-feedback-success")
  }else {
    toast.classList.add("bg-color-feedback-alert")
  }

  body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 4000);
}