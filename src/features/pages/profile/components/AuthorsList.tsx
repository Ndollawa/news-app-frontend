import React from 'react'
import { GoCheckCircleFill } from 'react-icons/go';


interface AuthoursIP{
    author:any;
    i:number;
    handlePreferredAuthorsCheck :any
}
const AuthorsList = ({author,i ,handlePreferredAuthorsCheck}:AuthoursIP) => {
  return (
     <li>
    <input type="checkbox" id={`author-${i}`} value={author} className="hidden peer" onChange={handlePreferredAuthorsCheck}/>
    <label htmlFor={`author-${i}`} className="inline-flex items-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-100 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
        <GoCheckCircleFill className= 'peer-checked:border-blue-600' size={'2rem'}/>
        <div className="block mx-2">
            <div className="w-full text-lg font-semibold">{author}</div>
        </div>
    </label>
</li>
  )
}

export default AuthorsList
