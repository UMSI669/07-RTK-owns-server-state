import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TRACKS = ['Product', 'Design', 'Engineering', 'Leadership'];

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'posts?_limit=8',
      transformResponse: (posts) => posts.map((post, index) => ({
        id: String(post.id),
        title: post.title,
        description: post.body,
        speaker: `Guest speaker ${post.userId}`,
        track: TRACKS[index % TRACKS.length],
        time: `${String(9 + index).padStart(2, '0')}:00`,
      })),
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
