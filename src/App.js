import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSection from './components/HomeSection/HomeSection';
import NewReleasesSection from './components/Sections/NewReleasesSection';
import MostPopularSection from './components/Sections/MostPopularSection';
import SearchSection from './components/Sections/SearchSection';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Error404 from './components/Error404/Error404';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomeSection />} />
          <Route path='/now_playing/:page' element={<NewReleasesSection />} />
          <Route path='/popular/:page' element={<MostPopularSection />} />
          <Route path='/search/' element={<SearchSection />} />
          <Route path='/search/:type/:value/:page' element={<SearchSection />} />
          <Route path='/movie/:idMovie' element={<MovieDetails />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
