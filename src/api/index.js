const BASE_API_URL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = async () => {
    const response = await fetch(`${BASE_API_URL}/character`, {
        method: 'GET'
    })
    return response.json()
}