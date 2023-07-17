import React,{LegacyRef} from 'react'


interface ArticleIP{
article:any;
ref?:any;
}

const Article = React.forwardRef(({article}:ArticleIP,ref) => {

    const {id,attributes:{image_url,author,title,article_url,source,source_id,source_name,published_at,description, category}} = article
    const content =(
      <>
      <img className="w-full" src={image_url || 'https://t3.ftcdn.net/jpg/03/27/55/60/240_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg'} alt={title}/>
<div className=" px-6 py-4">
 <div className="font-bold text-md mb-2">{title}</div>
 <p className="text-gray-700 text-sm mb-2" dangerouslySetInnerHTML={{__html:description}}>
 </p>
<div className='ml-3 my-1'><small>Published <u>{new Date(published_at).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}</u><br/> By<span className='text-sm inline text-wrap font-bold w-full mr-2 relative'> {author}</span></small>
</div>
</div> 
<div className="px-6 pt-4 pb-2 mb-5 inline-block">
{source &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source}</span>}
 {source_name &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source_name}</span>}
 {category &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{category}</span>}
 {source_id &&<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{source_id.substr(0,25)}</span>}

</div><br/>
<a href={article_url} target='_blank' rel='noreferrer' className="inline-flex absolute justify-center items-center place-self-end px-3 py-2 mb-5 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 bottom-0 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
 Read more
 <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
 </svg>
</a>
      </>
    )
  return (
 <> { ref?
<div ref={ref as LegacyRef<HTMLDivElement>} className="flex flex-col rounded overflow-hidden shadow-lg relative">
{content}
</div>
:<div className="flex flex-col rounded overflow-hidden shadow-lg relative">
{content}
</div>
} </>
  )
})

export default Article
