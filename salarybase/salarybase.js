const pool = require("../config")
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../modileware/index")

router.get("/salary_position", async (req,res,next) => {

    try{

        const [row,fields] = await pool.query("select * from Position")
        const [row1,fields1] = await pool.query("select count(position_name) as all_manager,count(position_name)*position_salary as sumsalary_manager from Employee_info join Position using(position_id) where position_name = 'Manager'")
        const [row2,fields2] = await pool.query("select count(position_name) as all_super,count(position_name)*position_salary as sumsalary_super from Employee_info join Position using(position_id) where position_name = 'Supervisor'")
        const [row3,fields3] = await pool.query("select count(position_name) as all_front,count(position_name)*position_salary as sumsalary_front from Employee_info join Position using(position_id) where position_name = 'Front-End'")
        const [row4,fields4] = await pool.query("select count(position_name) as all_back,count(position_name)*position_salary as sumsalary_back from Employee_info join Position using(position_id) where position_name = 'Back-End'")
        const [row5,fields5] = await pool.query("select count(position_name) as all_ui,count(position_name)*position_salary as sumsalary_ui from Employee_info join Position using(position_id) where position_name = 'UI-Designer'")
        const [row6,fields6] = await pool.query("select count(position_name) as all_ux,count(position_name)*position_salary as sumsalary_ux from Employee_info join Position using(position_id) where position_name = 'UX-Designer'")
        const [row7,fields7] = await pool.query("select count(position_name) as all_tester,count(position_name)*position_salary as sumsalary_tester from Employee_info join Position using(position_id) where position_name = 'TESTER'")
        

        res.json({postion:row,sum:{row1,row2,row3,row4,row5,row6,row7}})
    }catch(err){
        console.log(err);
    }
})


router.put("/update_salarybase", async (req, res, next) => {
  const position = req.body.position;
  const new_salary = req.body.salary;

  const conn = await pool.getConnection();
  conn.beginTransaction();

  try {
    const [row1, fields1] = await conn.query(
      "UPDATE position SET position_salary = ? WHERE position_name = ?",
      [new_salary, position]
    );

    conn.commit();

    res.status(200).json({ message: "Salary updated successfully" });
  } catch (err) {
    console.log(err);
    conn.rollback();
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    conn.release();
  }
});



exports.router = router;