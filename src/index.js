import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import client from './client/apollo';
import './index.css';
import App from './client/App.tsx';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
