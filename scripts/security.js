export const security = async () => {
  const token = localStorage.getItem("token")

  if(!token) {
    window.location.replace("../home/index.html")
  }
}

