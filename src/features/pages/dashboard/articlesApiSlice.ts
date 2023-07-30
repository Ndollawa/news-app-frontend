import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/stores/store";
import { apiSlice } from "../../../app/api/apiSlice";
// import articleProps from "../../../../app/utils/props/articleProps";
// interface articlesProp extends  articleProps{}


const articlesAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = articlesAdapter.getInitialState()

export const articlesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArticles: builder.query<any, any>({
            query: (q) => ({
              url: `/articles?q=${q.query}&page=${q.pageNum ?? 1}&sources=${q.sources}&authors=${q.authors}&date_from=${q.startDate}&date_to=${q.endDate}`,
              validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError;
              },
            }),
            providesTags: (result, error, page, arg) => {
              if (result?.ids) {
                return [
                  { type: 'Articles', id: 'LIST' },
                  ...result.ids.map((id: string) => ({ type: 'Articles', id })),
                  {type:'Articles', id:'PARTIAL_LIST'}
                ];
              } else {
                return [{ type: 'Articles', id: 'PARTIAL_LIST' }];
              }
            },
          }),
        getAuthors:builder.query({
            query:()=>({
                url: '/articles/authors'
            })
        }),
        getSources:builder.query({
            query:()=>({
                url: '/articles/sources'
            })
        }),
        addNewArticle: builder.mutation({
            query: article => ({
                url: '/articles',
                method: 'POST',
                body: article
            }),
            invalidatesTags:(result,error,arg) => [
                { type: 'Articles', id: "LIST" },
                {type:'Articles', id:'PARTIAL_LIST'}
            ]
        }),
        updateArticle: builder.mutation({
            query: article => ({
                url: '/articles',
                method: 'PATCH',
                body: article,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Articles', id: arg.id },
                {type:'Articles', id:'PARTIAL_LIST'}
            ]
        }),
        deleteArticle: builder.mutation({
            query: ({ _id }) => ({
                url: `/articles`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Articles', id: arg.id },
                {type:'Articles', id:'PARTIAL_LIST'}
            ]
        }),
    }),
})

export const {
    useGetArticlesQuery,
    useGetAuthorsQuery,
    useGetSourcesQuery,
    useAddNewArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
} = articlesApiSlice

// returns the query result object
export const selectArticlesResult = articlesApiSlice.endpoints.getArticles.select("Articles")

// creates memoized selector
const selectArticlesData = createSelector(
    selectArticlesResult,
    articlesResult => articlesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllArticles,
    selectById: selectArticleById,
    selectIds: selectArticleIds
    // Pass in a selector that returns the notes slice of state
} = articlesAdapter.getSelectors((state:RootState) => selectArticlesData(state) ?? initialState)