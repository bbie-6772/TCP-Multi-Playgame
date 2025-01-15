import pools from "../database.js"
import { USERS_QUERIES } from "../queries.js"

export const createUser = async (id) => {
    await pools.USER_DB.query(USERS_QUERIES.CREATE_USER, [id])
}

export const updateLogin = async (id) => {
    await pools.USER_DB.query(USERS_QUERIES.UPDATE_USER_LOGIN, [id])
}

export const saveLocation = async (id, x, y) => {
    await pools.USER_DB.query(USERS_QUERIES.SAVE_LOCATION, [x, y, id])
}

export const findUser = async (id) => {
    const [rows] = await pools.USER_DB.query(USERS_QUERIES.FIND_USER, [id])
    return rows[0]
}






