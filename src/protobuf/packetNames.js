export const packetNames = {
    request: {
        Packet: 'request.Packet',
        Ping: 'request.Ping'
    },
    initialRequest: {
        Packet: 'initialRequest.Packet'
    },
    response: {
        Packet: 'response.Packet',
    },
    error: {
        Error: 'error.Error'
    },
    initialResponse: {
        Packet: 'initialResponse.Packet'
    },
    gamePayload: {
        CreateGame: 'gamePayload.CreateGame',
        JoinGame: 'gamePayload.JoinGame',
        LocationUpdate: 'gamePayload.LocationUpdate'
    },
    gameNotification: {
        LocationUpdate: 'gameNotification.LocationUpdate'
    }
}