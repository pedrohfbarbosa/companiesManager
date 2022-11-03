import { validateUser } from "./apiRequests.js";

export const security = async () => {
  const token = localStorage.getItem("token")

  if(!token) {
    window.location.replace("../home/index.html")
  }
}

export const adminSecurity = async () => {
  const token = localStorage.getItem("token")

  const validation = await validateUser(token)

  if (!validation){
    window.location.replace("../userDash/index.html")
  }
}

export const userSecurity = async () => {
  const token = localStorage.getItem("token")

  const validation = await validateUser(token)

  if (validation){
    window.location.replace("../adminDash/index.html")
  }
}