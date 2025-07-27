import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between w-full'>
        <div className='m-5'>
            <div className="text-2xl bold">Resume Revamp</div>
        </div>
        <div className='m-5'>
            <button className='btn btn-info mr-2'>
                Sign-in
            </button>
            <button className='btn btn-primary'>
                Sign-up
            </button>
            
        </div>
    </div>
  )
}

export default Navbar