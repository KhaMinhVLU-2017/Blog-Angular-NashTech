

export const ConditionalResponse = (status,_service) => {
    switch (status) {
        case 401:
            _service.changeMessageError('Token has expired')
            _service.Logout()
            break
        case 403:
            _service.changeMessageError('You are Forbidden')
            break
        default:
            _service.changeMessageError('Not Found 404')
            break
    }
}