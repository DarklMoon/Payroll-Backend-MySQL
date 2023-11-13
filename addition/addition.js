const pool = require("../config")
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../modileware/index")



router.put("/select_addition", async (req,res,next) => {

    try{

        const [row,fields] = await pool.query("select *,count(emp_id) from Addition join Payroll using(addition_id)")
        res.json({deduc:row})


    }catch(err){
        console.log(err);

    }
})

router.get("/addition_info", async (req, res, next) => {
  try {
    const [row, fields] = await pool.query("select * from addition");
    res.json({ addition: row });
  } catch (err) {
    console.log(err);
  }
});

router.post("/insert_addition", async (req,res,next) => {
    
    const title = req.body.title;
    const name = req.body.name;
    const amount = req.body.amount;
    const percent = req.body.percent;

    const conn = await pool.getConnection()
    conn.beginTransaction()

    try{
        const [row,fields] = await conn.query(
        "insert into addition(addition_title,addition_name,addition_amount,percent,date) values(?,?,?,?,CURRENT_TIMESTAMP)",
        [title,name,amount,percent])

        conn.commit()
        res.status(200).json({ message: "Addition inserted successfully" });
    }catch(err){
        console.log(err);
        conn.rollback()
        res.status(500).json({ error: "Internal Server Error" });
    }finally{
        conn.release()
    }
})


router.delete("/delete_addition" ,async (req,res,next) => {
    
    const [deletee,fields2] = await conn.query("delete from addition where date < DATE_ADD(date,INTERVAL 1 MONTH)")
    
})
exports.router = router;

// if (amount != 0 && percent == 0){
//     const [row1,fields1] = await conn.query("update Payroll set netSalary = netSalary+? where emp_id = ?",[amount,id])
// }
// else if (percent != 0 && amount == 0){
//     const [row1,fields1] = await conn.query("update Payroll set netSalary = netSalary+(netSalary*?) where emp_id = ?",[tax,id])
// }
// else{
//     const [row1,fields1] = await conn.query("update Payroll set netSalary = netSalary+(netSalary*?) + amount  where emp_id = ?",[tax,amount,id])
// }