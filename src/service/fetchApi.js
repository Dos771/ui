const existingTokens = JSON.parse(localStorage.getItem('token'))

const fetchApi = async (url, method = 'GET', data = null) => {

    try {
        const headers = {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${existingTokens}`
        }

        let body

        if (data) {
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })

        return await response.json()

    } catch (e) {
        console.warn('Error', e.message)
    }

}

export default fetchApi