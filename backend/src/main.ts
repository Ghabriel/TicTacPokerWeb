import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as morgan from 'morgan';
import * as path from 'path';
import * as socketio from 'socket.io';

// /backend/js/ -> /
const suffix = ['backend', 'js'];
const root = __dirname.split(path.sep).slice(0, -suffix.length).join(path.sep);

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || '3001';

app.use(helmet());
app.use(morgan('dev'));

app.get('/*', (req, res) => {
    res.sendFile(root + '/frontend/dist/' + req.url);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port || 3000, () => {
    console.log(`Listening on port ${port}`);
});
