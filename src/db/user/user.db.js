import { toCamelCase } from "../../utils/transformCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "./user.queries.js";
import { v4 as uuidv4 } from 'uuid';

// 유저 찾기 함수
export const findUserByDeviceId = async (deviceId) => {
    // connection.query()와 만들어둔 쿼리문을 이용해 유저를 찾음
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [deviceId]);
    // 기본 Snake_Case를 CamelCase로 변환 해줌 (utils 에 포함)
    return toCamelCase(rows[0]);
}

// 유저 생성 함수
export const createUser = async (deviceId) => {
    // uuid 라이브러리를 이용해 uuid생성
    const id = uuidv4();
    // uuid를 이용해 user_db에 유저 생성
    await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, deviceId]);
    // 생성된 값 반환
    return {id, deviceId};
}

// 유저 로그인 업데이트 함수
export const updateUserLogin = async (id) => {
    // 유저의 최근 접속시간을 수정
    await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
}