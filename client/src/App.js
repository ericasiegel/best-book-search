import React from 'react';

// add two Apollo libraries
// A special type of React component that we'll use to provide data to all of the other componenets
import { ApolloProvider } from '@apollo/react-hooks';
// A React component we will use to get that data from the above when we're ready to use it
import ApolloClient from 'apollo-boost';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// establish the connection to the graphql server and Apollo
const client = new ApolloClient({
  // http request configuration
  request: operation => {
    const token = localStorage.getItem('id_token');
    //  use .setContext() method to set up the HTTP headers to include the token
    operation.setContext({
      headers: {
        authorization: token? `Bearer ${token}` : ''
      }
    });
  },
  // path to the back end server
  uri:'/graphql'

})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
