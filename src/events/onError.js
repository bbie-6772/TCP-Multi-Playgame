import { users } from "../session.js"

export const onError = (socket) => async (err) => {
    console.log("에러 발생")
    await users.removeUser({socket})
}