import React,{useState} from 'react'
import { IoIosClose, IoMdPricetags } from 'react-icons/io';

const Home = () => {
  const [authors, setAuthors] = useState<any>([]);
  const [authorName, setAuthorName] = useState("")
  const [sources, setSources] = useState<any>([]);
  const [sourceName, setSourceName] = useState("")

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

  return (
    <main className="flex min-h-screen flex-col justify-center container">

       <div className="grid grid-cols-3 justify-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search News</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
      
            <label htmlFor="authorTag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter by Authors</label>
            <div className="mt-1 flex gap-2 rounded-md shadow-sm items-stretch overflow-hidden max-h-56">
                   <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary m-0 w-full">
                    <div className="flex flex-wrap m-1">
                      {authors.map((authorName:string,i:number)=>{
                   return(<div className="p-1 text-xs border border-secondary rounded-sm flex items-center bg-gray-100 m-1" key={i}>
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
                   <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary flex flex-wrap items-center m-0 w-full">
                      {sources.map((sourceName:string,i:number)=>{
                   return(<div className="p-1 text-xs border border-secondary rounded-sm flex items-center bg-gray-100 m-1" key={i}>
                      <span >{sourceName}</span>
                      <IoIosClose className="text-md ml-1.5" onClick={(e)=>removeSourceName(sourceName)}/>
                      </div>)})
                      }
                </div>
                    <input 
                      className="outline-none border-0  bg-gray-50  border-gray-300 text-gray-900 text-sm  rounded-lg focus:transparent focus:transparent p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:transparent dark:focus:transparent" 
                      name="tag-input"
                      value={sourceName}
                      onChange={createSourceName}
                      onKeyDown={addSourceName} 
                      type="text" />
                  </div>
        </div> 

      </div>
  
  <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/mountain.jpg" alt="Mountain"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Mountain</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
   
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/river.jpg" alt="River"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">River</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div> 
      <a href="/gj" className="inline-flex w-52 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#summer</span>
     
      </div>
    </div>

   
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/forest.jpg" alt="Forest"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Forest</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
      </div>
    </div>

   
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/forest.jpg" alt="Forest"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Forest</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
      </div>
    </div>

   
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/forest.jpg" alt="Forest"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Forest</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
      </div>
    </div>
  </div>
    </main>
  )
}

export default React.memo(Home)
