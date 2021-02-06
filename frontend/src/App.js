import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CollectionScreen from './screens/CollectionScreen'
import AboutScreen from './screens/AboutScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={CollectionScreen} exact />
          <Route path='/collection' component={CollectionScreen} />
          <Route path='/about' component={AboutScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
