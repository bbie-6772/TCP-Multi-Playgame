export const packetNames = {
    common: {
        Packet: 'common.Packet',
        Ping: 'common.Ping'
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
        LocationUpdate: 'gamePayload.LocationUpdate',
        DirectionUpdate: 'gamePayload.DirectionUpdate'
    },
    gameNotification: {
        LocationUpdate: 'gameNotification.LocationUpdate'
    }
}