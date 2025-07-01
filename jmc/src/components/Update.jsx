import React, { useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
    const location = useLocation()
    const {user} = location.state || {}
    
  const navigate = useNavigate()

  const [role,setRole] = useState(user.role  || "")
  const [name , setName] = useState(user.name || "")
  const [course,setCourse] = useState(user.course || "")
  const [staff,setStaff] = useState(user.staff || " ")
  const [department,setDepartment] = useState(user.department || "")
  const [type,setType] = useState(user.type || "")
  const [ lecture,setLecture] = useState(user.lecture || "")
  const [empId,setEmpId] = useState(user.empId || "")
  const [dob,setdob] = useState(user.dob || "")
  const [email,setEmail] = useState(user.email || "")
  const [phoneNo,setPhoneNo] = useState(user.phoneNo || "")
  const [address,setAddress] = useState(user.address || "")
  const [file,setFile] = useState(user.file|| "")
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

    const handleFileUpload = async(e) =>{
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFile(base64)
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

  const [filterOption , setFilterOption] = useState(options)

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const formData = {
      role ,
      name ,
      course ,
      staff,
      department,
      type ,
      lecture ,
      empId ,
      dob ,
      email ,
      phoneNo ,
      address ,
      file ,
    }
    
    try {
        
      const send = await axios.put(`http://localhost:3001/${user._id}`,{formData});
      
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
      
      <form onSubmit={handleUpdate} > 
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
          <select value={role}
          className='w-20 p-2 my-2 rounded-lg
          border border-gray-300'
          onChange={(e)=>setRole(e.target.value)}>
            <option value="Mr">Mr.</option>
            <option value="Ms">Ms.</option>
          </select>
          <input type='text' placeholder='name' value={name}
          onChange={(e)=>setName(e.target.value)}
            className='mx-2 rounded-lg w-60 my-2 p-2 border border-gray-300 text-lg focus:border-transparent 
            focus:ring-0 focus:outline-none' />
        </div>

            <input type='text' placeholder='course' value={course}
            onChange={(e)=>setCourse(e.target.value)}
            className='p-2  my-2 rounded-lg
          border border-gray-300 focus:border-300 focus:ring-0 focus:outline-none text-lg lg:mb-4'/>

            <select className='p-2 my-2 rounded-lg
          border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4' 
            onChange={(e)=>{setStaff(e.target.value)
              handleDepartmentFilter(e.target.value)}
            }
            value={staff}>
              <option value="Aided">Aided</option>
              <option value="SF-Men">SF-Men</option>
              <option value="SF-Women">SF-Women</option>
            </select>

            <select className='p-2 my-2 rounded-lg
          border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4' value={department}
            onChange={(e)=>setDepartment(e.target.value)}>
              { filterOption.map(({value,label},index) =>
           <option key={index} value={value}>{label}</option>)

           }
            </select>
          </div>

          <div className='flex flex-col lg:mx-4  lg:mt-32'>
            <select className='p-2 py-3 my-2 rounded-lg lg:mb-4 border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none' 
            onChange={(e)=>setType(e.target.value)}
            value={type}>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
            </select>

            <input type='text' placeholder='lecture' value={lecture}
            onChange={(e)=>setLecture(e.target.value)}className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg lg:mb-4' 
             required = {true}/>

            <input type='text' placeholder='EmpId'  value={empId}
            onChange={(e)=>setEmpId(e.target.value)}
            className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg 
            lg:mb-4' />

            <input type='date' className='p-2 my-2 rounded-lg border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none lg:mb-4' 
            value={ dob.substring(0,10) || " "}
            onChange={(e)=>setdob(e.target.value)} 
            required = {true}/>
          </div>

          <div className='flex flex-col lg:ms-6 md:ms-6 mt-2 lg:mt-0'>
             <div className='flex items-center space-x-4 ms-10 md:ms-0 lg:ms-0'>
                <img src ={file ? file: user.file||"images/profile.png"} className='w-28 h-28 object-cover rounded-lg my-3 border-2 border-white' 
                alt='profile'/>

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
             
      <input type="text" placeholder='Email' value={email || ""}
      onChange={(e)=>setEmail(e.target.value)
      }
      className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' />

      <input type="number" placeholder='phone no' value={phoneNo}
      onChange={(e)=>setPhoneNo(e.target.value)}
      className='p-2 my-2 rounded-lg  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' 
      required = {true}/>

      <input type="text" placeholder='Address'
      onChange={(e)=>setAddress(e.target.value)} value={address}
      className='p-2 my-2 rounded-lg h-32  border border-gray-300 focus:border-400 focus:ring-0 focus:outline-none text-lg' 
    required = {true} />
    </div>
  </div>

        
  <div className='flex justify-around my-5 lg:my-2 '>
    <button className='border border-solid border-blue-700 mx-4 p-2 px-6 rounded-3xl bg-blue-600 text-white hover:bg-blue-800'
     onClick={(e)=>{
      e.preventDefault()
      navigate('/homePage')}
      }>Cancel</button>
    <button className='border border-solid border-red-700 mx-4 p-2 px-6 rounded-3xl bg-red-600 text-white hover:bg-red-800' type='submit'
    >Update</button>
  </div>
      </div>
      </div>
      </form>

    </div>
  )
}

export default Update
