import React from 'react'


interface ArticleIP{
article:any;
}

const Article = ({article}:ArticleIP) => {
    const {id,attributes:{image_url,author,title,article_url,source,source_id,source_name,published_at,description, category}} = article
  return (
    
<div className="flex flex-col rounded overflow-hidden shadow-lg relative">
<img className="w-full" src={image_url} alt={title}/>
<div className=" px-6 py-4">
 <div className="font-bold text-xl mb-2">{title}</div>
 <p className="text-gray-700 text-base mb-2" dangerouslySetInnerHTML={{__html:description}}>
 </p>
<p className='ml-3 my-1'><small>Published <u>{new Date(published_at).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}</u><br/> By<span className='text-sm font-bold'> {author}</span></small>
</p>
</div> 
<div className="px-6 pt-4 pb-2 mb-5 inline-block">
{source &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source}</span>}
 {source_name &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source_name}</span>}
 {category &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{category}</span>}

</div><br/>
<a href={article_url} target='_blank' rel='noreferrer' className="inline-flex absolute justify-center items-center place-self-end px-3 py-2 mb-5 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 bottom-0 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
 Read more
 <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
 </svg>
</a>
</div>

  )
}

export default Article
