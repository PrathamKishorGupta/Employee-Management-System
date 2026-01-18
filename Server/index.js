import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { adminRouter } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import Jwt from "jsonwebtoken";

const app = express();
// Development-friendly CORS: echo the request origin and allow credentials
// WARNING: echoing origin is intended for local development only.

app.use(
  cors({
    origin: [
      "http://localhost:5173",            // local frontend
      // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running');
});
