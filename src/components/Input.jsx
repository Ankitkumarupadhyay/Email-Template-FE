import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeBody, changeName, changeNewTemplate, changeSubject } from '../utils/emailSlice';
import { toast } from 'react-toastify';
import { API_URL } from '../config/constants';

const Input = () => {
    const dispatch = useDispatch()
    const [formData,setFormData]=useState({
        name:'',
        subject:'',
        body:'',
    });
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
          const response = await fetch(`${API_URL}/email`,{
            method : 'POST',
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
      <h1 className='font-semibold text-2xl text-white'>New Template</h1>
      <div className='mt-5 '>
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
      <button onClick={createTemplate} className='mt-2 px-10 py-2 font-semibold bg-white rounded-2xl'>Save</button>
    </div>
  )
}

export default Input
