import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:9000',
    }),
    endpoints : (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
        }),
        
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
        getRelatedVideo:builder.query({
            query: ({videoId,title}) => {
                const tags =  title.split(" ");
                const likes = tags.map((tag)=>`title_like=${tag}`);
                const queryString =`/videos?${ likes.join("&")}&_limit=4&_sort=likes:desc`;
                return queryString;
            },
        }),
    })
});

export const { useGetVideosQuery,useGetVideoQuery,useGetRelatedVideoQuery } = apiSlice;