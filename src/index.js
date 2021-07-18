import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import client from './server';
import './index.css';
import App from './client/App.tsx';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
