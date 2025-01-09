// Proto 파일(package name)과 그에 속한 Message(패킷 구조)를 역할별로 분리해줌
export const packetNames = {
    common: {
        Packet: 'common.Packet',
        Ping: 'common.Ping',
    },
    response: {
        Response: 'response.Response',
    },
    initial: {
        Packet: 'initial.Packet',
    },
    game: {
        CreateGamePayload: 'game.CreateGamePayload',
        JoinGamePayload: 'game.JoinGamePayload',
        LocationUpdatePayload: 'game.LocationUpdatePayload',
    },
    gameNotification: {
        Start: 'gameNotification.Start',
        LocationUpdate: 'gameNotification.LocationUpdate',
    },
}