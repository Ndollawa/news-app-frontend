import React,{useEffect, useState} from 'react'
import { IoIosClose, IoMdPricetags } from 'react-icons/io';
import { useGetArticlesQuery } from './articlesApiSlice';
import Article from './components/Article';
import useDebounce from '../../../app/utils/hooks/useDebounce';

const Dashboard = () => {

  const [articles, setArticles] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const [authorName, setAuthorName] = useState("")
  const [sources, setSources] = useState<any>([]);
  const [sourceName, setSourceName] = useState("")

	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query)
	useEffect(() => {
		setArticles(searchData(Object.values(data)[0]))
	}, [debouncedQuery])
	const keys = ['title','source','author','content','description']
const searchData = (data:any)=>{
	return data?.filter((item:any)=> keys?.some((key:string)=>item?.attributes[key]?.toLowerCase()?.includes(debouncedQuery.toLowerCase())))

}
  const createAuthorName = (e:any)=>{
    setAuthorName(e.target.value) 
  }
  // const tagwrapper= document.getElementsByClassName('tag-wrapper')!;
  const addAuthorName = (e:any) =>{
  if( e.key === 'Enter' ){
    if(authorName !== ""){
    setAuthors((authors:string[])=>{return [...authors,authorName]})
    setAuthorName("")
  } 
  }
  };
  const removeAuthorName = (key:string) =>{
    setAuthors((authors:string[])=>{return authors.filter(tag=> tag !== key )})
    setAuthorName("")
  }


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

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetArticlesQuery('articlesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})
useEffect(()=>{
if(isSuccess && !isLoading){
  // console.log()
  setArticles(Object.values(data)[0])
}
},[])

// console.log(articles)
  return (
    <section className="max-w-7xl mx-auto py-4 px-5 h-full">
    <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Dashboard</h1>
    </div>
    <div>

    <main className="flex min-h-screen flex-col">

<div className="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
 <div>
     <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search News</label>
     <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e)=>setQuery(e.target.value)} onKeyPress={()=>setArticles(searchData(Object.values(data)[0]))} placeholder="Search here.." />
 </div>
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
               onKeyDown={addAuthorName} 
                
               type="text"
               list='authorList' />
               <datalist id='authorList' className='w-full'>
                 <option onClick={addAuthorName} value={'Grace'}></option>
               </datalist>
           </div>
         </div>
 </div> 

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
               onKeyDown={addSourceName}
               type="text" 
               list='sourceList'
               />
                 <datalist id='sourceList' onChange={addSourceName} className='w-full'>
                 <option value={'Grace'}></option>
               </datalist>
           </div>
         </div>
 </div> 

</div>

<div className=" grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
{
  articles?.map((a:any)=> <Article article={a} key={a?.attributes?.title}/>)
}



</div>
</main>

        </div>
    </section>
  )
}

export default React.memo(Dashboard)
