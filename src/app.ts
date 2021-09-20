import express from 'express';

import router from './routes/user.router';

import user_router from './routes/user.router'
import area_router from './routes/area.router'
import collaborator_router from './routes/collaborator.router';
import stock_movements_router from './routes/stock_movements.router'
import stock_router from './routes/stock.router'
import comment_router from './routes/comment.router';

const app = express();

app.use(express.json());
app.use(router);
app.disable('etag');
app.use(express.urlencoded({ extended:true }));


app.use('/api',user_router);
app.use('/api',area_router);
app.use('/api',collaborator_router);
app.use('/api',stock_movements_router);
app.use('/api',stock_router);
app.use('/api',comment_router);


export default app;