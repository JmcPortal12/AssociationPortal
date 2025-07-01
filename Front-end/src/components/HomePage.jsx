import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from './Loader';
import TeacherDetailCard from './TeacherDetailCard';
function HomePage() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)
    const [userDetail,setUserDetail] = useState([])
    const [filterDetail,setFilterDetail] = useState([])
    const [search,setSearch] = useState("")
    const [staff,setStaff] = useState(" ")
    const [department,setDepartment] = useState(" ")
    const [category,setCategory] = useState(" ")
    const [selectedIndex, setSelectedIndex] = useState(null);

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

    const fetchData = useCallback( async()=>{
        setLoading(true)
        try {
            const user = await axios.get('https://associationportal-backend.onrender.com')
            setUserDetail(user.data)
            setLoading(false)
            console.log(user)
        } catch {
            console.log("error while Fetching the Data..")
        }
    },[]);

    useEffect(()=>{
        fetchData()
    },[fetchData])

    
     const handleDelete = async(id)=>{
        try {
            const deleteUser = await axios.delete(`https://associationportal-backend.onrender.com/${id}`)
            console.log(deleteUser.data.message)
            fetchData()
            
        } catch {
            console.log("Error while Deleting...")
        }

     }

const handleSearch = () =>{
        
    const regexp = new RegExp(search,"i");
    const result = userDetail.filter((user)=>regexp.test(user.empId || " ")|| regexp.test(user.name || " "))
    
    if(result.length == 0){
        toast.warn("Invalid Id/Name");
    }
    setFilterDetail(result)
    }

const handleFilter =(staffValue,departmentValue,categoryValue)=>{
   let result =[...userDetail]
   console.log(staffValue,departmentValue,categoryValue)
    if(staffValue && staffValue !== " "){
        result = result.filter((user)=>
        user.staff === staffValue)
    }
 
    if(departmentValue && departmentValue !== " "){
        result = result.filter((user)=>user.department === departmentValue)
    }

    if(categoryValue && categoryValue !== " "){
        result = result.filter((user)=>user.type === categoryValue)
    }

    if(result.length <= 0 ){
        toast.warning("No User Found!..")
    }
   setFilterDetail(result)
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
    
        <div className='  mx-auto '>
        <ToastContainer autoClose={900} />
        <div className='
        lg:flex bg-green-900 py-2  lg:p-3 lg:pe-20 justify-center
        md:py-2 sm:py-2 '>
        <select className='
        lg:px-2 lg:w-72 lg:me-1 lg:rounded-lg text-lg lg:h-12
        md:mx-10 md:p-2 md:rounded-xl md:w-48
        my-2 mx-4 p-2 rounded-xl w-20'
        onChange={(e)=>{
            setStaff(e.target.value)
            handleFilter(e.target.value,department,category)
            handleDepartmentFilter(e.target.value)
           }
        }>
            <option value="">Staff</option>
            <option value="Aided">Aided</option>
            <option value="SF-Men">SF-Men</option>
            <option value="SF-Women">SF-Women</option>
        </select>

        <select 
        className='
        lg:px-2 lg:w-72 lg:me-1 lg:h-12 rounded-lg text-lg  md:mx-10 md:p-2 md:rounded-xl md:w-48
        my-2 mx-2 p-2  w-36'
        onChange={(e)=>{
            setDepartment(e.target.value)
            handleFilter(staff,e.target.value,category)
           }}
         >
           { filterOption.map(({value,label},index) =>
           <option key={index} value={value}>{label}</option>)

           }
     </select>

        <select className='
        lg:px-2 lg:w-72 lg:me-3  text-lg lg:h-12
         md:mx-10 md:p-2 md:rounded-xl md:w-48
         my-2 mx-4 p-2 rounded-xl w-36'
         onChange={(e)=>{
             setCategory(e.target.value)
            handleFilter(staff,department,e.target.value)
         }}
         >
            <option value="">Category</option>
            <option value="Teaching">Teaching</option>
            <option value="Non-Teaching">Non-Teaching</option>
        </select>
     

        <div className=' md:flex lg:flex lg:ml-3 lg:pt-2 lg:mx-10
         md:ms-10 md:pt-4
         ms-4 '>
            <div className='flex bg-white w-72 h-12 lg:h-12
            border border-gray-300 rounded-lg  '>
            <input name='empId' className='
            border border-transparent focus:border-transparent focus:ring-0 focus:outline-none text-lg ms-2'
            onChange={(e)=>setSearch(e.target.value)}/>
            <button className='bg-gray-200 p-1 md:p-2 lg:p-2 rounded-lg my-1 mx-2' 
            onClick={()=>handleSearch()} type='submit'
            >Search</button>
            </div>

            <button 
        onClick={()=>navigate('/create',{state:options})}
        className='mx-3 lg:mx-3 bg-blue-500  p-3 lg:px-5 lg:rounded-3xl text-white font-bold lg:ms-10
        border-2 border-white ms-10  md:rounded-3xl
        rounded-3xl mt-3 md:mt-0 lg:mt-0'
        >create</button>
        
        <button 
        onClick={()=>navigate('/')}
        className='mx-3 lg:mx-3 bg-yellow-400  p-3 lg:px-5 lg:rounded-3xl text-white font-bold border-2 border-white ms-10 lg:ms-10 md:rounded-3xl rounded-3xl'
        >Logout</button>
        </div>
     </div>
        { loading ? <Loader/> :(
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10  md:ms-10 ms-12 '>
         {(filterDetail.length > 0 ? filterDetail : userDetail).map((user, index) => (
      <TeacherDetailCard 
        key={index} 
        user={user} 
        index={index}
        navigate={navigate}
        handleDelete={handleDelete}
        selectedIndex = {selectedIndex}
        setSelectedIndex = {setSelectedIndex}
      />
    ))}
        </div>) }
    </div>
  )
}

export default HomePage


