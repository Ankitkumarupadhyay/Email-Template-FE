import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL } from '../config/constants';
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { changeNewTemplate } from '../utils/emailSlice';


const ViewTemplate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[template,setTemplate]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const {id}=useParams();
  useEffect(()=>{
      fetchTemplate()
    },[]);
  
    const fetchTemplate = async()=>{
      const response = await fetch(`${API_URL}/email/${id}`);
      const json = await response.json();
      if(json.success){
        toast.success(json.message) 
        setIsLoading(false)
        setTemplate(json.data)       
      }
    }

    const deleteTemplate = async (id)=>{
    const response = await fetch(`${API_URL}/email/${id}`,{
                method : 'DELETE',
                headers : {
                  'Content-Type' : 'application/json'
                }
              });
              const json = await response.json();
              if(json.success){
                toast.success(json.message);
                dispatch(changeNewTemplate())
                navigate('/')
              }else{
                toast.error(json.message)
              }
    }
    
  return (
    <div className='flex min-h-[100vh] bg-[#dad9d9]  justify-center'>
      
        <div className=' mt-5 w-[400px] h-[500px] bg-[#0C3257] text-white rounded-xl p-2'>
        {isLoading ? <h1>Loading....</h1> :<div className='relative h-full'>
          <div className='pt-10 h-[90%]  overflow-auto scrollbar-none  scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            <h3 className='uppercase font-medium text-lg'>Name : {template.name}</h3>
            <h3 className='my-2 font-medium'>Subject : {template.subject}</h3>
            <h3 className='my-2 whitespace-pre-wrap'>{template.body}</h3>
          </div>
            <div className='absolute top-0 bg-[#0C3257] flex gap-3 right-2'>
              <div onClick={()=> navigate(`/edit/${template._id}`)} className='cursor-pointer'>
                <MdEditSquare size={20}/>
              </div>
              <div onClick={()=> deleteTemplate(template._id)} className='cursor-pointer'>
                <MdDelete size={20}/>
              </div>
            </div>
            </div>
        }
        </div>
      
      
      
    </div>
  )
}

export default ViewTemplate
