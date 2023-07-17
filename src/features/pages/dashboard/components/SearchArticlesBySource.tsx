import React,{useState} from 'react'
import { IoIosClose, IoMdPricetags } from 'react-icons/io'

const SearchArticlesBySource = ({
    sources,
    setSources,
    mArticles,
    setArticles,
    searchData,
    searchDataByAuthor,
    searchDataBySource
}:any) => {

    const [sourceName, setSourceName] = useState("")

    

  const createSourceName = (e:any)=>{
    setSourceName(e.target.value) 
  }
  // const tagwrapper= document.getElementsByClassName('tag-wrapper')!;
  const addSourceName = (e:any) =>{
  if( e.key === 'Enter' ){
    if(sourceName !== ""){
    setSources((sources:string[])=>{return [...sources,sourceName]})
    setSourceName("")
  } 
  }
  };
  const removeSourceName = (key:string) =>{
    setSources((sources:string[])=>{return sources.filter(tag=> tag !== key )})
    setSourceName("")
  };
  

  const articleSources = [...new Set(mArticles?.map((a:any)=>a?.attributes?.source_name))]

  return (
  
 <div>
 <label htmlFor="sourceTag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter by Sources</label>
 <div className="mt-1 flex gap-2 rounded-md shadow-sm items-stretch overflow-hidden max-h-56">
        <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary items-center m-0 w-full">
        <div className="flex flex-wrap m-1">
           {sources.map((sourceName:string,i:number)=>{
        return(<div className="p-1 text-xs border border-secondary rounded-sm flex items-center bg-gray-200 m-1" key={i}>
           <span >{sourceName}</span>
           <IoIosClose className="text-md ml-1.5" onClick={(e)=>removeSourceName(sourceName)}/>
           </div>)})
           }
           </div>
         <input 
           className="outline-none border-0 w-full  bg-gray-50  border-gray-300 text-gray-900 text-sm  rounded-lg focus:transparent focus:transparent p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:transparent dark:focus:transparent" 
           name="tag-input"
           value={sourceName}
           onChange={createSourceName}
           onKeyDown={(e)=>{addSourceName(e);setArticles(searchDataByAuthor(searchDataBySource(searchData(mArticles))))}}
           type="text" 
           list='sourceList'
           />
             <datalist id='sourceList' onChange={addSourceName} className='w-full'>
             {
              articleSources.map((source:any)=> <option onClick={addSourceName} key={'souce'+source} value={source}>{source}</option>)
            }
           </datalist>
       </div>
     </div>
</div> 
  )
}

export default SearchArticlesBySource
