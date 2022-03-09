import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSection from './components/HomeSection';
import NewReleasesSection from './components/NewReleasesSection';
import MostPopularSection from './components/MostPopularSection';
import SearchSection from './components/SearchSection';
import MovieDetails from './components/MovieDetails';
import Error404 from './components/Error404.js';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomeSection />} />
          <Route path='/newreleases' element={<NewReleasesSection />} />
          <Route path='/mostpopular' element={<MostPopularSection />} />
          <Route path='/search' element={<SearchSection />} />
          <Route path='/search/:results' element={<SearchSection />} />
          <Route path='/movie/:idMovie' element={<MovieDetails />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
