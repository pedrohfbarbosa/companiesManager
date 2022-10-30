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


