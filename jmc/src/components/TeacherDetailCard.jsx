import React from 'react'

const TeacherDetailCard = ({ user, index, navigate, handleDelete, selectedIndex,setSelectedIndex })=>{
  
    
const ToggleAddress = (cardIndex,e)=>{
  
  e.preventDefault();
   if(selectedIndex === cardIndex)
   {
    setSelectedIndex(null);
   }else
   {
       setSelectedIndex(cardIndex);
   }
    
  }
  


    return(
       
        <div key={index} className='bg-white rounded-2xl shadow-lg w-80 md:w-80 lg:w-80 mb-6 overflow-hidden'>
      
      <div className='bg-green-900 p-6 text-center relative'>
        <div className='absolute top-4 right-4 bg-black bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-semibold'>
          {user.staff }
        </div>
        
        <img 
          src={user.file || "images/profile.png"} 
          className='w-32 h-32 mx-auto rounded-xl mb-4 object-cover' 
          alt='profile'
        />
        
        <h2 className='text-white text-xl font-bold '>{user.name}</h2>
        <p className='text-slate-300 text-sm h-5'>
          {user.department} Department
        </p>
      </div>

      
      <div className='p-6'>
        <div className='mb-6'>
            <span className='text-xs text-slate-600 uppercase block mb-1'>EmpId</span>
            <span className='text-slate-700 font-medium'>{user.empId}</span>
          </div>
        <div className='mb-6'>
          <h3 className='text-xs font-bold text-slate-500 uppercase mb-3 border-b border-slate-200 pb-2'>
            Contact Information
          </h3>
          <div>
            <span className='text-xs text-slate-500 uppercase block mb-1'>Phone Number</span>
            <span className='text-slate-800 font-medium'>{user.phoneNo}</span>
          </div>
        </div>

        
        <div className='mb-6'>
          <h3 className='text-xs font-bold text-slate-500 uppercase mb-3 border-b border-slate-200 pb-2'>
            Address Details
          </h3>
          <div className='relative'>
            <span className='text-xs text-slate-500 uppercase block mb-1'>Full Address</span>
            <button 
              onClick={(e)=>{
                
                ToggleAddress(index,e)}}
              className='absolute top-0 right-0 text-blue-600 text-xs font-semibold hover:bg-blue-50 px-2 py-1 rounded'
            >
              {  selectedIndex === index ? 'Show Less' : 'Show More'}
            </button>
            <div className={`text-slate-800 transition-all duration-300 ${selectedIndex === index   ? 
            ' break-words min-h-[50px]' : 'max-h-7 overflow-hidden'}`}>
              {user.address}
            </div>
          </div>
        </div>

       
        <div>
          
           
            <div>
              <span className='text-xs text-slate-500 uppercase block mb-1'>Category</span>
              <span className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold'>
                {user.type}
              </span>
            </div>
          
        </div>
      </div>

     
      <div className=' py-2 mx-12 mb-5 lg:mx-12'>
        <div className='flex justify-end gap-10'>
          <button 
            className='bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors me-3'
            onClick={() => navigate('/update', {state: {user}})}
          >
            Update
          </button>
          <button 
            className='  bg-white hover:bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-xl text-sm font-semibold transition-colors'
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    )
}

export default TeacherDetailCard