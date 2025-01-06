import net from 'net';
import initServer from './init/index.js';
import { config } from './config/config.js';
import { onConnection } from './events/onConnection.js';

const server = net.createServer(onConnection);

initServer().then(() => {
    console.log(config)
    server.listen(config.server.port, config.server.host, () => {
        console.log(server.address());
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
})
