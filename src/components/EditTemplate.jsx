import LivePreview from './LivePreview'
import React, {  useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeBody, changeName, changeNewTemplate, changeSubject } from '../utils/emailSlice';
import { toast } from 'react-toastify';
import { API_URL } from '../config/constants';
import { useNavigate, useParams } from 'react-router-dom';

const EditTemplate = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData,setFormData]=useState({
        name:'',
        subject:'',
        body:'',
    });
    const fetchTemplate = async()=>{
          const response = await fetch(`${API_URL}/email/${id}`);
          const json = await response.json();
          if(json.success){
            setFormData({
                name: json.data.name,
                subject: json.data.subject,
                body: json.data.body,
            }) 
            dispatch(changeName(json.data.name));
            dispatch(changeSubject(json.data.subject));
            dispatch(changeBody(json.data.body))
          }
        }
useEffect(()=>{
    fetchTemplate();
},[])
        

    const handleInputChange=(e,key)=>{
        setFormData({...formData, [key]:e.target.value})
        if(key=='name'){
            dispatch(changeName(e.target.value))
        }
        if(key=='subject'){
            dispatch(changeSubject(e.target.value))
        }
        if(key=='body'){
            dispatch(changeBody(e.target.value))
        }
    }
     const createTemplate = async ()=>{
      try{
        if(formData.body=="" || formData.name=="" || formData.subject==""){
          toast.error("All fields are necessary")
         }else{
          const response = await fetch(`${API_URL}/email/${id}`,{
            method : 'PATCH',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
          });
          const json = await response.json();
          if(json.success){
            toast.success(json.message);
            setFormData({name:'',subject:'',body:''});
            dispatch(changeName(''))
            dispatch(changeSubject(''))
            dispatch(changeBody(''))
            dispatch(changeNewTemplate())
            navigate('/')
          }else{
            toast.error(json.message)
          }
         }
      }catch(err){
        toast.error(err.message)
      }   
     }
  return (
    <div>
      <div className="flex p-3  w-full">
          <div className="w-[50%] bg-[#0C3257] m-2  rounded-lg  p-10 pt-5 h-[550px]">
          <div>
      <h1 className='font-semibold text-white text-2xl'>New Template</h1>
      <div className='mt-5'>
        <label htmlFor="name" className='text-white'>Name:</label>
        <input type="text" onChange={e=> handleInputChange(e,'name')} value={formData.name} placeholder='Enter template name' className='w-full shadow-lg h-10 p-2 mt-1 outline-none rounded-lg' />
      </div>
      <div className='mt-5'>
        <label htmlFor="name" className='text-white'>Subject:</label>
        <input type="text" onChange={e=> handleInputChange(e,'subject')} value={formData.subject} placeholder='Enter subject' className='w-full shadow-lg h-10 p-2 mt-1 outline-none rounded-lg' />
      </div>
      <div className='mt-5'>
        <label htmlFor="name" className='text-white'>Body:</label>
        <textarea  value={formData.body} onChange={e=> handleInputChange(e,'body')} className='w-full shadow-lg h-48 p-2 mt-1 outline-none rounded-lg'></textarea>
      </div>
      <button onClick={createTemplate} className='mt-5 px-10 py-2 font-semibold bg-white rounded-2xl'>Save</button>
    </div>
          </div>
          <div className="w-[50%] m-2  bg-[#0C3257] rounded-lg p-10 pt-5 h-[550px] ">
            <LivePreview />
          </div>
        </div>
    </div>
  )
}

export default EditTemplate
