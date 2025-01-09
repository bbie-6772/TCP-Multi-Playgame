import net from 'net'
import { config } from './config/config.js'
import { onConnection } from './events/onConnection.js'
import { initServer } from './init/index.js'

const server = net.createServer(onConnection)

await initServer().then(() => {
    server.listen(config.server.port, config.server.host, () => {
        console.log('Opened server on', server.address())
    })
}).catch((e) => {
    console.error(e);
    process.exit(1);
})


