import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Update() {
const navigate = useNavigate();

const [role,setRole] = useState("Mr.")
const [name , setName] = useState("")
const [course,setCourse] = useState("")
const [staff,setStaff] = useState("Aided")
const [department,setDepartment] = useState("Computer Science")
const [type,setType] = useState("Teaching")
const [ lecture,setLecture] = useState("")
const [empId,setEmpId] = useState("")
const [dob,setdob] = useState("")
const [email,setEmail] = useState("")
const [phoneNo,setPhoneNo] = useState("")
const [address,setAddress] = useState(" ")
const [file,setFile] = useState("images/profile.png")
  const options = [
{ value: "", label: "Department" },
{ value: "Arabic", label: "Arabic" },
{ value: "Biotechnology", label: "Biotechnology" },
{ value: "Botany", label: "Botany" },
{ value: "Business Administration", label: "Business Administration" },
{ value: "Chemistry", label: "Chemistry" },
{ value: "Commerce", label: "Commerce" },
{ value: "Computer Science", label: "Computer Science" },
{ value: "Computer Science & IT", label: "Computer Science & IT" },
{ value: "Computer Application", label: "Computer Application" },
{ value: "Economics", label: "Economics" },
{ value: "Fashion Technology & Costume Designing", label: "Fashion Technology & Costume Designing" },
{ value: "English", label: "English" },
{ value: "French", label: "French" },
{ value: "Hindi", label: "Hindi" },
{ value: "History", label: "History" },
{ value: "Hotel Management", label: "Hotel Management" },
{ value: "Library", label: "Library" },
{ value: "Mathematics", label: "Mathematics" },
];

const [filterOption , setFilterOption] = useState(options)

const handleFileUpload = async(e) =>{
  const file = e.target.files[0];
  if(!file){
    console.log("No File Selected..")
    return;
  }
  
  try{
    const base64 = await convertToBase64(file);
      setFile(base64)
  }catch(error)
  {
    console.error(error.message);
  }
  
  
}
const convertToBase64 = (file)=>
{
  
  return new Promise((resolve,reject) =>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) =>{
      reject(error)
    }})}

const handleCreate = async(e)=>{
e.preventDefault()
const formData = {
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
  file : file ,
}
try {
  const send = await axios.post('https://associationportal-backend.onrender.com/create',{formData});

  console.log(send.data.message)
  navigate('/homePage')
  
} catch (error) {
  console.log('error :',error)
}

}


const handleDepartmentFilter = (staff)=>{
console.log(staff)
const Aided = ["Business Administration","Fashion Technology & Costume Designing","Mathematics"]
const SF =  ["Computer Application","Economics","English"] 

if(staff === "Aided"){
    const result = options.filter((department)=> !Aided.includes(department.value) )
    setFilterOption(result)
}

if(staff === "SF-Men" || staff === "SF-Women"){
    const result = options.filter((department)=> !SF.includes(department.value) )
    setFilterOption(result)
}

if(staff === ""){
    setFilterOption(options);
}

}
return (
<div className='flex items-center justify-center min-h-screen'
  style={{
    backgroundImage: "url('images/images.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100% 100%"
  }}>
  
  <form onSubmit={handleCreate} action={'https://associationportal-backend.onrender.com/create'}> 
  <div className='bg-white/50 backdrop-blur-sm rounded-xl pt-8 my-4'>
  <div className='flex justify-center '>
  <img 
    className='w-[700px] h-32'
    src = "images/jmc_logo.png"
    alt='jmc_logo'/>
    </div>
  
  <div className='flex flex-col b  px-2 
  md:p-20 lg:p-20'>
    <div className='flex flex-col lg:flex-row gap-[20px] md:flex-col'>
      <div className='flex flex-col'>
        <div className='md:flex lg:mb-4 lg:mt-32'>
          <select className='w-20 p-2 my-2 rounded-lg
          border border-gray-300 '
          onChange={(e)=>setRole(e.target.value)} required = {true}>
            <option value="Mr">Mr.</option>
            <option value="Ms">Ms.</option>
          </select>
          <input type='text' placeholder='name'
          onChange={(e)=>setName(e.target.value)}
            className='mx-2 rounded-lg w-60 my-2 p-2 border border-gray-300 text-lg focus:border-transparent 
            focus:ring-0 focus:outline-none '
            required = {true}
            />
        </div>

        <input type='text' placeholder='course'
        onChange={(e)=>setCourse(e.target.value)}
        className='p-2  my-2 rounded-lg
          border border-gray-300 focus:border-300 focus:ring-0 focus:outline-none text-lg lg:mb-4'
        required = {true}
          />

        <select className='p-2 my-2 rounded-lg
          border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4'
        onChange={(e)=>{setStaff(e.target.value)
          handleDepartmentFilter(e.target.value)
        }}
        required = {true}>
          <option value="Aided">Aided</option>
          <option value="SF-Men">SF-Men</option>
          <option value="SF-Women">SF-Women</option>
        </select>

        <select className='p-2 my-2 rounded-lg
          border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4'
        onChange={(e)=>setDepartment(e.target.value)}
        required = {true}>
          { filterOption.map(({value,label},index) =>
        <option key={index} value={value}>{label}</option>)

        }
        </select>
      </div>

      <div className='flex flex-col lg:mx-4  lg:mt-32'>
        <select className='p-2 py-3 my-2 rounded-lg lg:mb-4
          border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none'
        onChange={(e)=>setType(e.target.value)}
        required = {true}>
          <option value="Teaching">Teaching</option>
          <option value="Non-Teaching">Non-Teaching</option>
        </select>

        <input type='text' placeholder='lecture'
        onChange={(e)=>setLecture(e.target.value)}className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg lg:mb-4' 
        required = {true}/>

        <input type='text' placeholder='EmpId' 
        onChange={(e)=>setEmpId(e.target.value)}
        className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg 
        lg:mb-4' 
        required = {true}
        />

        <input type='date' className='p-2 my-2 rounded-lg border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4'
        onChange={(e)=>setdob(e.target.value)} 
        required = {true}/>
      </div>

  <div className='flex flex-col  lg:ms-6 md:ms-6 mt-2 lg:mt-0'>
      <div className="flex items-center space-x-4 ms-10 md:ms-0 lg:ms-0">
        <img
        src={file}
        alt="profile"
        className="w-28 h-28 object-cover rounded-lg my-3 border-2 border-white"
        />


        <div>
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 inline-block border-2 border-white"
        >
          📤 Upload Image
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
          className="hidden"
        />
        </div>
        </div>


    <input type="text" placeholder='Email' 
    onChange={(e)=>setEmail(e.target.value)}
    className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' 
    required = {true}/>

    <input type="number" placeholder='phone no' 
    onChange={(e)=>setPhoneNo(e.target.value)}
    className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' 
    required = {true}
    />

    <input type="text" placeholder='Address'
    onChange={(e)=>setAddress(e.target.value)}
    className='p-2 my-2 rounded-lg h-32  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' 
    required = {true}
  />
  
  </div>
</div>

    
  <div className='flex justify-around my-5 lg:my-2'>
    <button className='border border-solid border-blue-700 mx-4 p-2 px-6 rounded-3xl bg-blue-600 text-white hover:bg-blue-800' onClick={(e)=>{
      e.preventDefault()
      navigate('/homePage')}
      }>Back</button>
    <button className='border border-solid border-red-700 mx-4 p-2 px-6 rounded-3xl bg-red-600 text-white hover:bg-red-800' type='submit'>Create</button>
  </div>
  </div>
  </div>
  </form>

</div>
)
}

export default Update
