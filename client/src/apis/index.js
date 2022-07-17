export function handleError(errors = []) {
    return {success: false, errors: errors.length !== 0 ? errors : [{param: 'all', msg: 'Something goes wrong...'}]}
}

export const handleSuccess = async response => {
    let data = await response.json()
    if(response.ok) 
        return data

    return handleError(data.errors)
}