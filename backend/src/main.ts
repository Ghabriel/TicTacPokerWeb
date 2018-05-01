import * as express from 'express';
import * as fs from 'fs';
import * as helmet from 'helmet';
import * as http from 'http';
import * as morgan from 'morgan';
import * as path from 'path';

import { setupSocket } from './setupSocket';
import { SocketController } from './SocketController';

// /backend/js/ -> /
const suffix = ['backend', 'js'];
const root = __dirname.split(path.sep).slice(0, -suffix.length).join(path.sep);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '3001';

app.use(helmet());
// app.use(morgan('dev'));

app.use(express.static(root + '/frontend/dist'));

app.get('*', (req, res) => {
    res.sendFile(root + '/frontend/dist/');
});

setupSocket(server);

server.listen(port || 3000, () => {
    console.log(`Listening on port ${port}`);
});
