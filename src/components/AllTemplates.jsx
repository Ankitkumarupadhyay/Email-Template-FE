import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { API_URL } from '../config/constants';

const AllTemplates = () => {
  const [template,setTemplate]=useState([]);
  const isNewTemplateAdded = useSelector(state=> state.email.newTemplate)
  useEffect(()=>{
    fetchTemplate()
  },[isNewTemplateAdded]);

  const fetchTemplate = async()=>{
    const response = await fetch(`${API_URL}/email`);
    const json = await response.json();
    if(json.success){
      setTemplate(json.data);
    }
  }

  
  return (
    <div className='p-5 w-full'>
      <h1 className='font-bold text-[#0C3257] text-2xl mb-5'>All templates</h1>
      <div className='flex flex-wrap gap-5 w-full justify-center items-center'>
     {template.map(t=>(
     <Link key={t.name} to={`/view/${t._id}`}>
          <div className='bg-[#0C3257] text-white p-5 rounded-lg h-[300px] w-[300px]'>
                <h3 className='uppercase font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis'>{t.name}</h3>
                <p className='font-semibold text-lg my-5 '>{t.subject}</p>
        
           </div>
     </Link>
     ))} 
     </div>
    </div>
  )
}

export default AllTemplates
