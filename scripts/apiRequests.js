const baseUrl = "http://localhost:6278"

export const getSectors = async () => {

  try {

    const responseJson = await fetch(`${baseUrl}/sectors`)
    const response = await responseJson.json()

    return response.map(e => e.description)

  } catch (err) {
    console.log(err)
  }
}

export const getAllCompanies = async () => {

  try {

    const responseJson = await fetch(`${baseUrl}/companies`)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
  }
}

export const getCompaniesBySector = async (sector) => {

  try {

    const responseJson = await fetch(`${baseUrl}/companies/${sector}`)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
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

      setTimeout(() => {

        window.location.replace("../login/index.html")

      }, 4000);


    } else if (response.error[0].includes("email")) {
      console.log("Email já existe")
    } else {
      console.log("Algo deu errado, verifique sua conexão com a internet")
    }

    return response

  } catch (err) {
    console.log(err)
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

      localStorage.setItem("token", response.token)

      if (await validateUser(response.token)) {
        window.location.replace("../adminDash/index.html")
      } else {
        const userInfo = await getUserInfo(response.token)
        localStorage.setItem("user", JSON.stringify(userInfo))
        window.location.replace("../userDash/index.html")
      }

    } else {
      console.log("email ou senha inválidos")
    }

    return response

  } catch (err) {
    console.log(err)
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

    return response
  } catch (err) {
    console.log(err)
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

    return response
  } catch (err) {
    console.log(err)
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

    return response

  } catch (err) {
    console.log(err)
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

    return response
  } catch (err) {
    console.log(err)
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
    const response = await responseJson.json()

    return response

  } catch (err) {

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

    return response
  } catch (err) {
    console.log(err)
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
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)
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

    return response
  } catch (err) {
    console.log(err)
  }
}