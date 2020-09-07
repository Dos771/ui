
const request = async (url, method = 'GET', data = null) => {

    try {
        const headers = {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk4ODg2MTY0LCJqdGkiOiIzMTliMDQ4YWNiM2Y0NWYyODc3YmEyOThmYmVkNTQwMiIsInVzZXJfaWQiOiJmYzkxMzFiYS1iNmYzLTQ5MTEtYTUzNy1iMDhkM2I4N2IxMTUifQ.XLDzcteFhW-46nhVcITaw01Rk1qhHduV8pMqOFypOnA'
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

export default request