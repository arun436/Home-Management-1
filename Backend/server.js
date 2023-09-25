import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import cookieparser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

const saltRounds=10;


const app=express();
// app.use(cors({
    
//         origin: "http://localhost:5173",
//         methods: ["POST", "GET", "PUT"],
//         credentials: true
    
// }))
app.get('/',(req,res)=>{

})
app.use(cors())
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Methods","POST,GET,PUT,DELETE")
//     res.setHeader("Access-Control-Allow-Origin","Content-Type")
//     res.setHeader("Access-Control-Allow-Credentials",true)
//     next();
// })

const con=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root123',
    database:'homemangement'
})

con.connect((err)=>{
    err?console.log(err):console.log('connected successfully')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})  

app.post("/register", (req, res) => {
    const sql = "CALL Create_Admins(?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const userid = uuidv4()
        const values = [
            userid,
            req.body.name,
             null,
            null,
            req.body.email,
            hash,
            null,
            0
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Error registering a user",err});
            return res.json({Status: "Success"});
        })
    } )
})
  

app.post('/login',(req,res)=>{
    const username = req.body.email;
    const password = req.body.password;
  
    con.query(
      "SELECT * FROM users WHERE email = ? and isDeleted=0;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].Password, (error, response) => {
            if (response) {
                const id = result[0].Id;
                const token = jwt.sign({role: "user"}, "jwt-secret-key", {expiresIn: '1d'});
                res.cookie('token', token);
                return res.json({Status: "Success",Result:result})
            } else {
              res.send({ ErrorMessage: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ ErrorMessage: "User doesn't exist" });
        }
      }
    );
})

app.get('/api/getUsers', (req, res) => {
    const sql = "CALL Get_Users(?)";
    con.query(sql,[req.query.adminid],(err, result) => {
        res.header("Access-Control-Allow-Origin","*")
        if(err) return res.json({Status: "Error",Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/api/getuser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "call Get_UserById(?)";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get user error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


app.put('/api/updateuser/:id',(req, res) => {
    const id = req.params.id;
    const sql = "CALL Update_User(?,?,?,?,?)";
    con.query(sql, [id,req.body.name,Number(req.body.age),req.body.phone,req.body.email], (err, result) => {
        if(err) return res.json({Error: "update User error in sql",err});
        return res.json({Status: "Success"})
    })
})
app.delete('/api/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "CALL Delete_User(?)";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete user error in sql"});
        return res.json({Status: "Success"})
    })
})



app.post('/api/createuser',upload.single('image'), (req, res) => {
    const sql = "CALL Create_Users(?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const userid = uuidv4()
        const values = [
            userid,
            req.body.name,
           Number(req.body.age),
            req.body.phone,
            req.body.email,
            hash,
            req.file.filename,
            0,
            req.body.adminid
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside signup query",err});
            return res.json({Status: "Success"});
        })
    } )
})

app.get('/api/getPlatforms', (req, res) => {
    const sql = "SELECT Id,Platform from Platforms";
    con.query(sql, (err, result) => {
        res.header("Access-Control-Allow-Origin","*")
        if(err) return res.json({Status: "Error",Error: "Get platforms error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})



app.post('/api/createsubscription', (req, res) => {
  const sql = "CALL Create_Subscription(?)";
        const subscriptionid = uuidv4()
        const values = [
            subscriptionid,
            req.body.accountname,
           req.body.planperiod,
            req.body.startdate,
            req.body.enddate,
            req.body.userid,
            0
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Error creating a new subscription",err});
            return res.json({Status: "Success"});
        })
    } )

    app.put('/api/updateusubscription/:id', (req, res) => {
        const id = req.params.id;
        const sql = "CALL Update_Subscription(?,?,?,?)";
        con.query(sql, [id,req.body.planperiod,req.body.startdate,req.body.enddate], (err, result) => {
            if(err) return res.json({Error: "update subscription error in sql",err});
            return res.json({Status: "Success"})
        })
    })
    app.delete('/api/deletesubscription/:id', (req, res) => {
        const id = req.params.id;
        const sql = "CALL Delete_Subscription(?)";
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Error: "delete subscription error in sql"});
            return res.json({Status: "Success"})
        })
    })

    app.get('/api/getsubscriptions', (req, res) => {
        const sql = "CALL Get_Subscriptions(?)";
        con.query(sql,[req.query.userid], (err, result) => {
            res.header("Access-Control-Allow-Origin","*")
            if(err) return res.json({Status: "Error",Error: "Get users error in sql"});
            return res.json({Status: "Success", Result: result})
        })
    })
    
    app.get('/api/getsubscription/:id', (req, res) => {
        const id = req.params.id;
        const sql = "CALL Get_SubscriptionById(?)";
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Error: "Get subscription error in sql",err});
            return res.json({Status: "Success", Result: result})
        })
    })

    app.post('/api/createdocument', (req, res) => {
        const sql = "CALL Create_Document(?)";
              const documentid = uuidv4()
              const values = [
                  documentid,
                  req.body.documentname,
                 req.body.startdate,
                  req.body.renewalperiod,
                  req.body.enddate,
                  req.body.userid,
                  0
              ]
              con.query(sql, [values], (err, result) => {
                  if(err) return res.json({Error: "Error creating a new document",err});
                  return res.json({Status: "Success"});
              })
          } )
      
          app.put('/api/updatedocument/:id', (req, res) => {
              const id = req.params.id;
              const sql = "CALL Update_Document(?,?,?)";
              con.query(sql, [id,req.body.renewalperiod,req.body.enddate], (err, result) => {
                  if(err) return res.json({Error: "update document error in sql",err});
                  return res.json({Status: "Success"})
              })
          })
          app.delete('/api/deletedocument/:id', (req, res) => {
              const id = req.params.id;
              const sql = "CALL Delete_Document(?)";
              con.query(sql, [id], (err, result) => {
                  if(err) return res.json({Error: "delete document error in sql"});
                  return res.json({Status: "Success"})
              })
          })
      
          app.get('/api/getdocuments', (req, res) => {
              const sql = "CALL Get_Documents(?)";
              con.query(sql,[req.query.userid], (err, result) => {
                  res.header("Access-Control-Allow-Origin","*")
                  if(err) return res.json({Status: "Error",Error: "Get documents error in sql"});
                  return res.json({Status: "Success", Result: result})
              })
          })
          
          app.get('/api/getdocument/:id', (req, res) => {
              const id = req.params.id;
              const sql = "CALL Get_DocumentById(?)";
              con.query(sql, [id], (err, result) => {
                  if(err) return res.json({Error: "Get document error in sql",err});
                  return res.json({Status: "Success", Result: result})
              })
          })

          app.put('/api/updateuserprofileimage/:id',upload.single('image'), (req, res) => {
            const id = req.params.id;
            const sql = "CALL Update_ProfilePic(?,?)";
            con.query(sql, [id,req.file.filename], (err, result) => {
                if(err) return res.json({Error: "update Userimage error in sql",err});
                return res.json({Status: "Success"})
            })
        })




app.listen(8801,()=>{
    console.log('running')
})