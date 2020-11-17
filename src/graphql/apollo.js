import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
  uri: 'https://sweet-hedgehog-55.hasura.app/v1/graphql/',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => window.console.error(
      `[GraphQL ошибка]: Сообщение: ${message}, Место: ${locations}, Путь: ${path}`,
    ));
  }
  if (networkError) window.console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
