import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import './style/index.scss'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from './hooks/useAuth';


const httpLink = createHttpLink({
  // uri: `${process.env.GRAPHL_SERVER_URL}/graphql`,
  // uri: `https://staging.paris3-0921.wns.wilders.dev/graphql`,
  uri: `http://localhost:8000/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
