import { users } from "../session.js"

export const onEnd = (socket) => async () => {
    console.log("연결 종료")
    await users.removeUser({socket})
}