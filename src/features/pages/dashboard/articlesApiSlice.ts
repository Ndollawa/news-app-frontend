import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
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
            query: () => ({
              url: '/articles',
              validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError;
              },
            }),
            providesTags: (result, error, arg) => {
              if (result?.ids) {
                return [
                  { type: 'Article', id: 'LIST' },
                  ...result.ids.map((id: string) => ({ type: 'Articles', id })),
                ];
              } else {
                return [{ type: 'Article', id: 'LIST' }];
              }
            },
          }),
          
        addNewArticle: builder.mutation({
            query: article => ({
                url: '/articles',
                method: 'POST',
                body: article
            }),
            invalidatesTags: [
                { type: 'Article', id: "LIST" }
            ]
        }),
        updateArticle: builder.mutation({
            query: article => ({
                url: '/articles',
                method: 'PATCH',
                body: article,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Article', id: arg.id }
            ]
        }),
        deleteArticle: builder.mutation({
            query: ({ _id }) => ({
                url: `/articles`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Article', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetArticlesQuery,
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
} = articlesAdapter.getSelectors((state:any) => selectArticlesData(state) ?? initialState)