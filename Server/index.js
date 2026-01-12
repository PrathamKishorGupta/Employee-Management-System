import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { adminRouter } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import Jwt from "jsonwebtoken";

const app = express();
// Development-friendly CORS: echo the request origin and allow credentials
// WARNING: echoing origin is intended for local development only.

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth' , adminRouter)
app.use('/employee', EmployeeRouter)
app.use(express.static('Public'))

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        Jwt.verify(token, "jwt_secret_key", (err, decoded) =>{
           if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    }
    else{
        return res.json({Status: false, Error: "Not authenticated"})
    }
} 
app.get('/verify', varifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id})
})

app.listen(3000, () => {
    console.log('Server is running');
});
