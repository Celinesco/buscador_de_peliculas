import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" />
          <Route path="/new-realeases"/>
          <Route path="/popular" />
          <Route path="/trending/page/:number-page" />
          <Route path="/top_rated/page:number-page" />
          <Route path="/upcoming/page/:number-page" />
          <Route path="on_cinemas/page/:number-page" />
          <Route path="/movie/:idMovie/info" />
          <Route path="/movie/:idMovie/cast" />
          <Route path="/movie/:idMovie/trailer" />
          <Route path="/movie/:idMovie/similar-movies" />
        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
