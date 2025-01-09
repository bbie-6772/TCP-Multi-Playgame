export const packetNames = {
    common: {
        Packet: 'common.Packet',
        Ping: 'common.Ping'
    },
    initial: {
        Packet: 'initial.Packet'
    },
    response: {
        Packet: 'response.Packet'
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