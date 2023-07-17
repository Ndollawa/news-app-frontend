import React from 'react'

interface WrapperIP{
    children:React.ReactNode
}
const Wrapper = ({children}:WrapperIP) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-10">
      {children}
    </div>
  )
}

export default Wrapper
