import { users } from "../session.js"

export const onEnd = (socket) => () => {
    console.log("연결 종료")
    users.removeUser({socket})
}