const express = require('express')
const router = express()
const cors = require('cors');
router.use(express.json());
router.use(cors());
const Login = require('./../module/index')
const Teacher = require('./../module/teacher')




router.get('/',async(req,res)=>{
    const user = await Teacher.find({});
   
this.addListener
    res.status(200).json(user)
})

router.post('/',async(req,res)=>
{
    try {
  
    const {data} = req.body
    const username = data.username
    const password = data.password
        

    // const loginSave = new Login({username :username,
    //     password : password
    // });
    // await loginSave.save();

    const login = await Login.find({});
    // ^| if not await then query is return ^|
    console.log(login);


    const log = login.some((user)=>(username == user.username && password == user.password))
    
    if(log){
        res.status(200).json({message:"Login in successfully !..."})
    }else{
        res.status(401).json({message:"Invalid Username and Password !.."})
    }
    } catch (error) {
        if(!res.headersSent){

            res.status(500).json({message:"server internal error"})
        }
    }
})
   
    router.post('/create',async(req,res)=>{
        try {
            const {formData} = req.body;
          
            const role = formData.role
            const name = formData.name
            const course = formData.course
            const staff  = formData.staff
            const department = formData.department
            const type = formData.type
            const lecture = formData.lecture
            const empId = formData.empId
            const dob = formData.dob
            const email = formData.email
            const phoneNo = formData.phoneNo
            const address = formData.address
            const file = formData.file
            
        const teacher = new Teacher({
            role :role,
            name : name,
            course :course,
            staff:staff,
            department:department,
            type : type,
            lecture : lecture,
            empId : empId,
            dob : dob,
            email :email,
            phoneNo :phoneNo,
            address : address,
            file : file
        })

           await teacher.save()
            res.status(200).json({message:'sucessfull created'})

        } catch  {
            if(!res.headersSent){
                res.status(500).json({message:'Invalid Details error'})
            }
        }

    })

        router.put('/:id',async(req,res)=>{
           try {
            const {formData} = req.body
           const id = req.params.id
           const teacher = await Teacher.findById(id)
           teacher.role = formData.role 
           teacher.name = formData.name
           teacher.course = formData.course,
           teacher.staff= formData.staff,
           teacher.department= formData.department,
           teacher.type = formData.type,
           teacher.lecture = formData.lecture,
           teacher.empId = formData.empId,
           teacher.dob = formData.dob,
           teacher.email = formData.email,
           teacher.phoneNo = formData.phoneNo,
           teacher.address = formData.address
           teacher.file = formData.file;
           await teacher.save();
           res.status(200).json({message:"update Sucessfully.."})
           } catch  {
            if(!res.headersSent)
            {
                res.status(500).json({message :"Failed to Update.."})
            }
           }
            
           
        })

    router.delete('/:id',async(req,res)=>{
        
        const id = req.params.id
        try {
            const deleteUser = await Teacher.findByIdAndDelete(id)
            
            if(!deleteUser){
                res.status(404).json({message:"User Not Found !."})
            }
            res.status(200).json({message:"delete Sucessfully."})
        } catch {
            if(!res.headersSent){
                res.status(500).json({message:"Invalid user Id!"})
            }
            
        }
        
    })
module.exports = router


