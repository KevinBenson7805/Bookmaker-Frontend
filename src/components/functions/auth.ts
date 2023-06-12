import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:8000/",
});
interface TokenParams {
    accessToken: string,
    refreshToken: string
}
export const isLoginCheck = async ({ accessToken, refreshToken }: TokenParams) => {

    try {
        const res = await api.post("api/islogin/ ", {}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
        if (res.data.detail === "Authentication failed. Please provide valid credentials.") {
            const sendData = new URLSearchParams()
            sendData.append('refresh', refreshToken)

            try {
                const res = await api.post('api/token/refresh/', sendData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

                try {
                    const currentAccessToken = res.data.access
                    const res1 = await api.post("api/islogin/ ", {}, {
                        headers: {
                            'Authorization': 'Bearer ' + currentAccessToken,
                            'Content-Type': 'application/json'
                        }
                    })
                    if (res1.data.detail === "Authentication failed. Please provide valid credentials.") {
                        return null
                    }
                    else
                        return currentAccessToken
                } catch (err) {
                    return null
                }
            } catch (err) {

                return null
            }
        }
        else if(res.data.message==="logged in")
            return accessToken
        return null
    } catch (err: any) {

        if (err.message === "Request failed with status code 401") {

        }
    }
}