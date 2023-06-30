var express =require('express')
var router= express.Router();
var pool =require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

/* GET home page. */
var jwt=require("jsonwebtoken")
//hhhhhh

const verifyJWT = (req, res, next)=>{
    console.log(req.headers);
    const token=req.headers.authoriztion;
    console.log("Token:",token);

    if (!token){
        res.json({ auth:false,message:"We need a token ,please gove it to us next time"});
    }
    else{
        jwt.verify(token,"jwtSecret",(err,decode)=>{
            console.log(decode);
            if(err){
                console.log(err);
                res.json({auth:false,message:"you are failed to authenticate"});
            }else{
             req.userId=decode.id;
             next();
            };
        });
    };
};

router.get("/getToken",(req,res)=>{
    var mytoken=JSON.parse(localStorage.getItem('jwttoken'))
    
    res.json({ token:mytoken.token })
  })

router.get("/isUserAuth",verifyJWT, (req,res)=>{
    res.json({auth:true,message:"you are failed to authenticate"});     
})

router.post('/check_admin_login',function(req,res, next){
    console.log(req.body)
    pool.query("select * from administrator where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    if(error)
    { console.log(error)
        res.status(500).json({status:false,message:'Server Error'});
     }
    else
    {if(result.length==1)
        {const token =jwt.sign({emailid:result[0].emailid}, "jwtSecret",{
            expiresIn:"1hr",
       
        });
        localStorage.setItem('jwttoken',JSON.stringify({token}))
        res.status(200).json({status:true,admin:result[0],token:token});
    }
        else
        res.status(200).json({status:false,message:'Invalid Emailid/Mobile Number/password'})
    }
    
})
})

module.exports = router;