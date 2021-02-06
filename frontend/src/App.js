import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CollectionScreen from './screens/CollectionScreen'
import AboutScreen from './screens/AboutScreen'
import LoginScreen from './screens/LoginScreen'
import ManageArtworkScreen from './screens/ManageArtworkScreen'
import ArtworkEditScreen from './screens/ArtworkEditScreen'
import ArtworkCreateScreen from './screens/ArtworkCreateScreen'
import SiteInfoScreen from './screens/SiteInfoEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={CollectionScreen} exact />
          <Route path='/collection' component={CollectionScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/admin/login' component={LoginScreen} />
          <Route path='/admin/artworksList' component={ManageArtworkScreen} />
          <Route path='/admin/artworks/:id/edit' component={ArtworkEditScreen} />
          <Route path='/admin/artworks/create' component={ArtworkCreateScreen} />
          <Route path='/admin/siteinfo' component={SiteInfoScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
