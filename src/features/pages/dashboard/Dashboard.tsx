import React,{useEffect, useState, useRef, useCallback } from 'react'
import { useGetArticlesQuery } from './articlesApiSlice'
import Article from './components/Article'
import useDebounce from '../../../app/utils/hooks/useDebounce'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../auth/authSlice'
import noResult from '../../../images/no-result.png'
import { PropagateLoader, SyncLoader } from 'react-spinners'
import SearchArticlesByKeyword from './components/SearchArticlesByKeyword'
import SearchArticlesByAuthor from './components/SearchArticlesByAuthor'
import SearchArticlesBySource from './components/SearchArticlesBySource'
import Wrapper from './components/Wrapper'


const Dashboard = () => {
  const [authors, setAuthors] = useState<any>([])
  const [sources, setSources] = useState<any>([])
  const [mArticles, setMArticles] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const currentUser = useSelector(selectCurrentUser)
	const [query, setQuery] = useState('')
	const [hasNextPage, setHasNextPage] = useState(true)
	const debouncedQuery = useDebounce(query)
  const [pageNum, setPageNum] = useState(1)
  const {
    data,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error
} = useGetArticlesQuery(pageNum)


	useEffect(() => {
		setArticles(searchData(mArticles))
	}, [debouncedQuery])
	const keys = ['title','source','author','content','description']
const searchData = (data:any)=>{
	return data?.filter((item:any)=> keys?.some((key:string)=>item?.attributes[key]?.toLowerCase()?.includes(debouncedQuery.toLowerCase())))

}
const searchDataByAuthor = (data: any) => {
  if (!data) {
    return [];
  }
  const authorRegex = new RegExp(authors?.join('|'), 'i');
  return data.filter((item: any) => authorRegex.test(item?.attributes['author']));
};

const searchDataBySource = (data: any) => {
  if (!data) {
    return [];
  }
  const sourceRegex = new RegExp(sources?.join('|'), 'i');
  return data.filter((item: any) => sourceRegex.test(item?.attributes['source_name']));
};

  useEffect(() => {
    
    const filterArticlesByUserPreference = (data:any) => {
      const feedsPreferences = currentUser.profile?.feeds_preferences;
      if (!feedsPreferences) {
        return data; // Return the original data if feedsPreferences is null
      }
      

      const { preferred_authors, preferred_sources } = feedsPreferences as any;
    
      return data?.filter((item:any) => {
        const sourceName = item?.attributes['source_name']?.toLowerCase()
        const authorName = item?.attributes['author']?.toLowerCase()
    
        return (
          preferred_sources?.some((source:string) => sourceName?.includes(source.toLowerCase())) ||
          preferred_authors?.some((author:string) => authorName?.includes(author.toLowerCase()))
        )
      })
    }
    
	data &&	setMArticles(filterArticlesByUserPreference(Object.values(data)[0]))
	}, [currentUser.id,data])



useEffect(()=>{
// if(isSuccess && !isLoading && !isFetching){
  setArticles((prev:any) => [...articles,...mArticles])
// }
 setHasNextPage(Boolean(articles.length))
},[])

 
useEffect(()=>{
if(isSuccess && !isLoading && !isFetching){
  setArticles((prev:any) => [...articles,...mArticles])
}
 setHasNextPage(Boolean(articles.length))
},[pageNum,isSuccess,isLoading,isFetching,mArticles])

 
const intObserver = useRef<IntersectionObserver | null>(null);
const lastPostRef = useCallback(
  (post: HTMLDivElement | null) => {
    if (isLoading) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPageNum((prev) => prev + 1);
      }
    });

    if (post) intObserver.current.observe(post);
  },
  [isLoading, hasNextPage]
);
 const props= {
  sources,
  setSources,
  authors, 
  setAuthors,
  mArticles,
  setQuery,
  setArticles,
  searchData,
  searchDataByAuthor,
  searchDataBySource
}
// console.log(articles)
  return (
    <section className="max-w-7xl mx-auto py-4 px-5 h-full">
    <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Dashboard</h1>
    </div>
    <div>

    <main className="flex min-h-screen flex-col">

<div className="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
<SearchArticlesByKeyword {...props} />
<SearchArticlesByAuthor {...props}/>
<SearchArticlesBySource {...props}/>

</div>
{  !articles.length && !isLoading && !isFetching? 
<Wrapper>
<img src={noResult} width={320} alt='no result'/>
<p>Sorry, No Result found!</p>
</Wrapper>
:isLoading?
<Wrapper><SyncLoader className='text-[#1A2238]' size={'2rem'}/>
</Wrapper>
:
<div className=" grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
{
  articles?.map((a:any,i:number)=>{
    if (articles.length === i + 1) {
      return  <Article ref={lastPostRef} article={a} key={i+a?.attributes?.title}/>
  }
  return <Article article={a} key={i+a?.attributes?.title}/>
   })
}
</div>}
{articles.length && isFetching?
 <Wrapper><PropagateLoader className='text-[#1A2238]' size={'2rem'}/>
</Wrapper>
 : null}
</main>

        </div>
    </section>
  )
}

export default React.memo(Dashboard)
