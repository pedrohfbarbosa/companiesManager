import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278"

export const getSectors = async () => {

  try {

    const responseJson = await fetch(`${baseUrl}/sectors`)
    const response = await responseJson.json()

    return response.map(e => e.description)

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const getAllCompanies = async () => {

  try {

    const responseJson = await fetch(`${baseUrl}/companies`)
    const response = await responseJson.json()

    return response

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const getCompaniesBySector = async (sector) => {

  try {

    const responseJson = await fetch(`${baseUrl}/companies/${sector}`)
    const response = await responseJson.json()

    return response

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const register = async (body) => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  try {

    const responseJson = await fetch(`${baseUrl}/auth/register`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {

      toast("success", "Cadastro efetuado com sucesso!")

      setTimeout(() => {

        window.location.replace("../login/index.html")

      }, 4000);


    } else {
      if (response.error[0].includes("email")) {
        toast("error", "E-mail já cadastrado")
      } else {
        toast("error", "Erro de cadastro! Verifique novamente seus dados")
      }
    }

    return response

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const validateUser = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}/auth/validate_user`, options)
    const response = await responseJson.json()

    return response.is_admin
  } catch (err) {
    console.log(err)
  }
}

export const getUserInfo = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }

  try {
    const responseJson = await fetch(`${baseUrl}/users/profile`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const login = async (body) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  try {

    const responseJson = await fetch(`${baseUrl}/auth/login`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {

      toast("success", "Login efetuado com sucesso!")

      localStorage.setItem("token", response.token)

      const validation = await validateUser(response.token)

      if (validation) {

        setTimeout(() => {

          window.location.replace("../adminDash/index.html")

        }, 4000);


      } else {

        const userInfo = await getUserInfo(response.token)
        localStorage.setItem("user", JSON.stringify(userInfo))

        setTimeout(() => {

          window.location.replace("../userDash/index.html")

        }, 4000);

      }

    } else {
      toast("error", "E-mail ou senha inválidos")
    }

    return response

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const getAllDepartments = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}/departments`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const getDepartmentsFromCompany = async (token, id) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}/departments/${id}`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const getAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}/users`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const allUnemployed = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}/admin/out_of_work`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const hireEmployee = async (body, token) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}/departments/hire`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Usuário contratado com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

    return response
  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const fireEmployee = async (token, id) => {
  const options = {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const responseJson = await fetch(`${baseUrl}/departments/dismiss/${id}`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Usuário desligado com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

    return response
  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const createDepartmentRequest = async (token, body) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}/departments`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Departamento criado com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

    return response

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const editDepartment = async (token, id, body) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}/departments/${id}`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Departamento editado com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

    return response
  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const deleteDepartment = async (token, id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }

  try {
    const responseJson = await fetch(`${baseUrl}/departments/${id}`, options)

    if (responseJson.ok) {
      toast("success", "Departamento excluído com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const editUserAdminDash = async (token, id, body) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}/admin/update_user/${id}`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Usuário editado com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

    return response
  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const deleteUser = async (token, id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }

  try {
    const responseJson = await fetch(`${baseUrl}/admin/delete_user/${id}`, options)

    if (responseJson.ok) {
      toast("success", "Usuário excluído com sucesso!")
    } else {
      toast("error", "Verifique sua conexão com a internet e tente novamente")
    }

  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}

export const getDepartmentUser = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }

  try {
    const responseJson = await fetch(`${baseUrl}/users/departments`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const getCoWorkers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }

  try {
    const responseJson = await fetch(`${baseUrl}/users/departments/coworkers`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const editUser = async (token, body) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}/users`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      toast("success", "Usuário editado com sucesso!")
    } else {
      if (response.error.includes("email")) {
        toast("error", "E-mail já cadastrado")
      } else {
        toast("error", "Erro de edição! Verifique novamente seus dados")
      }
    }

    return response
  } catch (err) {
    toast("error", "Erro de conexão! Verifique sua conexão com a internet")
  }
}