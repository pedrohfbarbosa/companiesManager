const baseUrl = 'http://localhost:6278'

export const getSectors = async () => {

  try{

    const responseJson = await fetch(`${baseUrl}/sectors`)
    const response = await responseJson.json()

    return response.map(e => e.description)

  }catch(err){
    console.log(err)
  }
}

export const getAllCompanies = async () => {

  try{

    const responseJson = await fetch(`${baseUrl}/companies`)
    const response = await responseJson.json()

    return response

  }catch(err){
    console.log(err)
  }
}

export const getCompaniesBySector = async (sector) => {

  try{

    const responseJson = await fetch(`${baseUrl}/companies/${sector}`)
    const response = await responseJson.json()

    return response

  }catch(err){
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

  try{

    const responseJson = await fetch(`${baseUrl}/auth/register`, options)
    const response = await responseJson.json()
    
    if(responseJson.ok){

      setTimeout(() => {

        window.location.replace("../login/index.html")
        
      }, 4000);

      
    }else if (response.error[0].includes("email")){
      console.log("Email já existe")
    }else {
      console.log("Algo deu errado, verifique sua conexão com a internet")
    }

    return response

  }catch(err){
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
  }catch (err) {
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

  try{

    const responseJson = await fetch(`${baseUrl}/auth/login`, options)
    const response = await responseJson.json()
    
    if(responseJson.ok){

      localStorage.setItem("token", response.token)

      if (await validateUser(response.token)){
        window.location.replace("../adminDash/index.html")
      }else {
        window.location.replace("../userDash/index.html")
      }
      
    }else{
      console.log("email ou senha inválidos")
    }

    return response

  }catch(err){
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

  try{

    const responseJson = await fetch(`${baseUrl}/departments`, options)
    const response = await responseJson.json()
    
    return response

  }catch(err){
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

  try{

    const responseJson = await fetch(`${baseUrl}/departments/${id}`, options)
    const response = await responseJson.json()
    
    return response

  }catch(err){
    console.log(err)
  }
}
