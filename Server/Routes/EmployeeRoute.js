import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  console.log("Login attempt with:", req.body);

  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.json({
        loginStatus: false,
        Error: "Query Error: " + err.message,
      });
    }

    console.log("Query result:", result);

    // If email not found
    if (result.length === 0) {
      return res.json({
        loginStatus: false,
        Error: "Wrong Email or password",
      });
    }

    // Compare password
    bcrypt.compare(req.body.password, result[0].password, (err, match) => {
      if (err) {
        return res.json({
          loginStatus: false,
          Error: "Password Compare Error: " + err.message,
        });
      }

      if (!match) {
        return res.json({
          loginStatus: false,
          Error: "Wrong Email or password",
        });
      }

      // If password matches
      const token = jwt.sign(
        { role: "employee", email: result[0].email , id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true, id: result[0].id });
    });
  });
});

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "select * from employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as EmployeeRouter };
