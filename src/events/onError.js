import { users } from "../session.js"

export const onError = (socket) => (err) => {
    console.log("에러 발생")
    users.removeUser({socket})
}