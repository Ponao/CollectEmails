import { handleError, handleSuccess } from "."

let apiUrl = `${process.env.REACT_APP_API_URL}/api/email/`

const apis = {
    collect: function(params) {
        return fetch(`${apiUrl}collect`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('email api "collect" error:', e)
            return handleError()
        })
    },
}

export default apis