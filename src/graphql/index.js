// import { ApolloClient } from "apollo-client";
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import config from 'config'

// const httpLink = createHttpLink({
//   uri: `${config.API_ENDPOINT}/graphql`,
//   credentials: 'same-origin'
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('factlist_token');
//   // return the headers to the context so httpLink can read them
//   console.log(headers, "headers", token)
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? token : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// });
// console.log(client, 'client')
// export default client;


import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});
console.log(httpLink, '${config.API_ENDPOINT}/graphql', `${config.API_ENDPOINT}/graphql`)
const authLink = setContext((_, { }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('factlist_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU0OTcxNDc0OSwiZXhwIjoxNDUwOTcxNDc0OX0.ZUQHrnZgWX0O9muk8IdLrSfBKsBIr98egezJ0a6Zq20",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
