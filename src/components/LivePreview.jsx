import React from 'react'
import { useSelector } from 'react-redux'

const LivePreview = () => {
    const emailData = useSelector(store=> store.email)
  return (
    <div className=' h-full'>
        <h1 className='font-semibold text-white text-2xl'>LivePreview</h1>
        <div className='h-[90%] mt-5 w-full bg-white overflow-auto  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-xl p-2'>
            <h3 className='uppercase font-medium text-lg'>{emailData.name ? emailData.name : 'Template name'}</h3>
            <h3 className='my-2  font-medium'>Subject : {emailData.subject}</h3>
            <h3 className='my-2 whitespace-pre-wrap'>{emailData.body}</h3>
        </div>
    </div>
  )
}

export default LivePreview
