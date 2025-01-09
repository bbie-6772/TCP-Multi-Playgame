import net from 'net';
import initServer from './init/index.js';
import { config } from './config/config.js';
import { onConnection } from './events/onConnection.js';

const server = net.createServer(onConnection);

// 초기 서버 설정 완료 후 서버 listen(오픈)
initServer().then(() => {
    server.listen(config.server.port, config.server.host, () => {
        console.log(server.address());
    });
// 만약 과정 중 오류가 나오면 강제종료
}).catch((err) => {
    console.error(err);
    process.exit(1);
})
