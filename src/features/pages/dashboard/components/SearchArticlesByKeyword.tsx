import React from 'react'

const SearchArticlesByKeyword = ({setQuery}:any) => {
  return (
    <div>
    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search News</label>
    <div className="mt-1 flex gap-2 rounded-md shadow-sm items-stretch overflow-hidden max-h-56">
        <div className="mt-1 rounded-md shadow-sm p-1 pb-0 border-2 border-secondary items-center m-0 w-full">
        <div className="flex flex-wrap m-1 ">
    <input type="text" className="outline-none border w-full bg-gray-50  border-gray-300 text-gray-900 text-sm  rounded-lg focus:transparent focus:transparent p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:transparent dark:focus:transparent"
     onChange={(e)=>setQuery(e.target.value)} placeholder="Search here.." />
     </div>
   </div>
  </div>
</div>
  )
}

export default SearchArticlesByKeyword
