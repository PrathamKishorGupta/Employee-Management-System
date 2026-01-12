import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

// Test endpoint to verify connection
router.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});

// Admin login API
router.post("/adminlogin", (req, res) => {
  console.log("Login attempt with:", req.body);
  const sql = "SELECT * FROM admin WHERE email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.json({
        loginStatus: false,
        Error: "Query Error: " + err.message,
      });
    }
    console.log("Query result:", result);
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      //res.cookie("token", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      //res.cookie('token', token, { httpOnly: false, path: '/' })
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or password" });
    }
  });
});

// API to get categories
router.get("/categories", (req, res) => {
  console.log("Fetching categories");
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Get categories error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    console.log("Categories fetched:", result);
    return res.json(result);
  });
});

//API to add category
router.post("/add_category", (req, res) => {
  console.log("Add category request:", req.body);
  const name = req.body && req.body.name ? req.body.name.trim() : "";
  if (!name) {
    return res.json({ Status: false, Error: "Name is required" });
  }
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Add category query error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    // return inserted id for convenience
    return res.json({ Status: true, id: result.insertId });
  });
});

// image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

// API to add employee
router.post("/add_employee", upload.single("image"), (req, res) => {

  const sql = `INSERT INTO employee 
  (name,email,password,address,salary,image,category_id)  VALUES (?)`;
  // Why use bcrypt? Because you should NEVER store passwords in plain text
  //  you are hashing the employee password before saving it into the database.
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id || null
    ];
    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Add employee MySQL Error:", err);
        return res.json({
          Status: false,
          Error: "Query Error: " + err.message,
        });
      }
      return res.json({ Status: true });
    });
  });
});

// Get all employees to manage employees
router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Get employees error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    // return single employee object for convenience
    return res.json({ Status: true, Result: result[0] });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee
      SET name = ?, email = ?, salary = ?, address = ?, category_id = ?
      WHERE id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id || null,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, AffectedRows: result.affectedRows });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, AffectedRows: result.affectedRows });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS employee FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salary from employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Edit employee error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", { path: "/", httpOnly: false });
  return res.json({ Status: true });
});

export { router as adminRouter };
