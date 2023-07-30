import React, { useEffect, useState, useRef, useCallback } from "react";
import { useGetArticlesQuery } from "./articlesApiSlice";
import Article from "./components/Article";
import useDebounce from "../../../app/utils/hooks/useDebounce";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../auth/authSlice";
import noResult from "../../../images/no-result.png";
import { PropagateLoader, SyncLoader } from "react-spinners";
import SearchArticlesByKeyword from "./components/SearchArticlesByKeyword";
import SearchArticlesByAuthor from "./components/SearchArticlesByAuthor";
import SearchArticlesBySource from "./components/SearchArticlesBySource";
import Wrapper from "./components/Wrapper";
import SearchByDateRange from "./components/SearchByDateRange";
import { GoCalendar } from "react-icons/go";

const Dashboard = () => {
  const [authors, setAuthors] = useState<any>([]);
  const [sources, setSources] = useState<any>([]);
  const [mArticles, setMArticles] = useState<any>([]);
  const currentUser = useSelector(selectCurrentUser);
  const [query, setQuery] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const debouncedQuery = useDebounce(query);
  const [pageNum, setPageNum] = useState(1);
 

  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetArticlesQuery({
      pageNum,
      query: debouncedQuery,
      sources,
      authors,
      startDate: dates[0]?.startDate
        ? new Date(dates[0]?.startDate)?.toISOString()
        : "",
      endDate: dates[0]?.endDate
        ? new Date(dates[0]?.endDate)?.toISOString()
        : "",
    });

 
 const filterArticlesByUserPreference = (data: any) => {
      if(!currentUser.id) return data
      const { preferred_authors, preferred_sources } = currentUser.profile;
      if (preferred_authors?.length === 0 && preferred_sources?.length === 0) {
        return data; // Return the original data if feedsPreferences is null
      }

      return data?.filter((item: any) => {
        const sourceName = item?.attributes["source_name"]?.toLowerCase();
        const authorName = item?.attributes["author"]?.toLowerCase();

        return (
          (preferred_sources as string[])?.some((source: string) =>
            sourceName?.includes(source.toLowerCase())
          ) ||
          (preferred_authors as string[])?.some((author: string) =>
            authorName?.includes(author.toLowerCase())
          )
        );
      });
    };


  useEffect(() => {
    setMArticles((prev: any) => [...prev,...mArticles]);
    setHasNextPage(Boolean(mArticles.length));
  }, [pageNum]);

  useEffect(() => {
    if (isSuccess && !isLoading && !isFetching) {
     setMArticles((prev: any) => [
        // ...prev,
        ...filterArticlesByUserPreference(Object.values(data)[0]),
      ]);
      } 
  }, [isSuccess, isLoading, isFetching]);

 
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (post: HTMLDivElement | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          // console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );
  const props = {
    sources,
    setSources,
    authors,
    setAuthors,
    mArticles,
    showDates,
    dates,
    setDates,
    setShowDates,
    setQuery,
    // setArticles,
    // searchData,
    // searchDataByAuthor,
    // searchDataBySource
  };

  // console.log(mArticles)
  return (
    <section className="max-w-7xl mx-auto py-4 px-5 h-full">
      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Dashboard</h1>
      </div>
      <div>
        <main className="flex min-h-screen flex-col">
          <div className="grid md:relative grid-cols-2 justify-center sm:grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5">
            <SearchArticlesByKeyword {...props} />
            <SearchArticlesByAuthor {...props} />
            <SearchArticlesBySource {...props} />
            <button
              type="button"
              onClick={() => setShowDates((prev) => !prev)}
              className="bg-[#499b99] justify-center text-sm flex items-center hover:bg-[#499b99]-700  self-end h-16 text-slate-50 font-extrabold w-fit px-6"
            >
              Filter by Dates&ensp;
              <GoCalendar fontSize={"2rem"} />
            </button>
          </div>
          <SearchByDateRange {...props} />
          {!mArticles.length && !isLoading && !isFetching ? (
            <Wrapper>
              <img src={noResult} width={320} alt="no result" />
              <p>Sorry, No Result found!</p>
            </Wrapper>
          ) : isLoading ? (
            <Wrapper>
              <SyncLoader className="text-[#1A2238] sm:text-md text-4xl" />
            </Wrapper>
          ) : (
            <div className=" grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {mArticles?.map((a: any, i: number) => {
                if (mArticles.length === i + 1) {
                  return (
                    <Article
                      ref={lastPostRef}
                      article={a}
                      key={i + a?.attributes?.title}
                    />
                  );
                }
                return <Article article={a} key={i + a?.attributes?.title} />;
              })}
            </div>
          )}
          {mArticles.length && isFetching ? (
            <Wrapper>
              <PropagateLoader className="text-[#1A2238] sm:text-md text-4xl" />
            </Wrapper>
          ) : null}
        </main>
      </div>
    </section>
  );
};

export default React.memo(Dashboard);
