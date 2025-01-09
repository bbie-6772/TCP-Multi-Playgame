import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { createUser, findUserByDeviceId, updateUserLogin } from "../../db/user/user.db.js";
import { addUser } from "../../session/user.session.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler =  async ({socket, userId, payload}) => {
    try {
        const { deviceId } = payload;

        // db에서 유저 존재 확인
        let user = await findUserByDeviceId(deviceId);
        // 없을 경우에만 db에 추가
        if(!user) user = await createUser(deviceId);
        // 있으면 최근 로그인 시간을 변경
        else await updateUserLogin(user.id);

        //서버(세션)에 유저 추가
        addUser(socket, user.id);

        // 접속여부 반송을 위해 Response Packet 생성
        const initialResponse = createResponse(
            HANDLER_IDS.INITIAL,
            RESPONSE_SUCCESS_CODE, 
            { userId: user.id }, 
            deviceId
        );

        // 처리 완료 반환
        socket.write(initialResponse);
    } catch (e) {
        handlerError(e, socket);   
    }
};

export default initialHandler;