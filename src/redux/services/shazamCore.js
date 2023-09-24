import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const offset = "?startFrom=19";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => `/charts/track/${offset}` }),
    // getSongById: builder.query({ query: () => `/` }),

    getSongDetails: builder.query({
      query: ({ songid }) =>
        `/shazam-songs/get-details/?locale=en-US&id=${songid}`,
    }),

    getSongRelated: builder.query({
      query: ({ songid }) =>
        `/shazam-songs/list-similarities/?locale=en-US&id=track-similarities-id-${songid}`,

      getArtistDetails: builder.query({
        query: (artustId) => `/artists/get-details?id=${artustId}`,
      }),
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  d,
} = shazamCoreApi;

// 659236090
// 666419045
