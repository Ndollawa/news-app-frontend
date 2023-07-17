import React,{useState} from 'react'
import { IoIosClose, IoMdPricetags } from 'react-icons/io'

const SearchArticlesByAuthor = ({
    authors, 
    setAuthors,
    mArticles,
    setArticles,
    searchData,
    searchDataByAuthor,
    searchDataBySource
}:any) => {
   
    const [authorName, setAuthorName] = useState("")
    
  const createAuthorName = (e:any)=>{
    setAuthorName(e.target.value) 
  }
  // const tagwrapper= document.getElementsByClassName('tag-wrapper')!;
  const addAuthorName = (e:any) =>{
  if( e.key === 'Enter' ){
    if(authorName !== ""){
    setAuthors((authors:string[])=>{return [...authors,authorName]})
    setAuthorName("")
  } }}
  const removeAuthorName = (key:string) =>{
    setAuthors((authors:string[])=>{return authors.filter(tag=> tag !== key )})
    setAuthorName("")
  }
  
const articleAuthors = [...new Set(mArticles?.map((a:any)=>a?.attributes?.author))]

  return (
    <div>

    <label htmlFor="authorTag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter by Authors</label>
    <div className="mt-1 flex gap-2 rounded-md shadow-sm items-stretch overflow-hidden max-h-56">
           <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary m-0 w-full">
            <div className="flex flex-wrap m-1">
              {authors.map((authorName:string,i:number)=>{
           return(<div className="p-1 text-xs border border-secondary rounded-sm flex items-center bg-gray-200 m-1" key={i}>
              <span >{authorName}</span>
              <IoIosClose className="text-md ml-1.5" onClick={(e)=>removeAuthorName(authorName)}/>
              </div>)})
              }
            </div>
              
            <input 
              className="outline-none border-0 w-full focus:outline-none  bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:transparent focus:transparent p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:transparent dark:focus:transparent" 
              name="tag-input"
              value={authorName}
              onChange={createAuthorName}
              onKeyDown={(e)=>{addAuthorName(e); setArticles(searchData(searchDataByAuthor(searchDataBySource(mArticles))))}} 
               
              type="text"
              list='authorList' />
              <datalist id='authorList' className='w-full'>
               {
                 articleAuthors.map((author:any,i:number)=><option onClick={addAuthorName} key={'authors'+i} value={author}>{author}</option>)
               }
                
              </datalist>
          </div>
        </div>
</div> 
  )
}

export default SearchArticlesByAuthor
