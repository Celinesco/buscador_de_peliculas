import MovieLists from "../MovieLists/MovieLists";
import './HomeSection.scss'
import CarrouselContainer from "../Carrousel/CarrouselContainer";


const HomeSection = () => {
    return (
        <section className="section__home sections__styles ">
            <CarrouselContainer />
            <div className="container__movie-components">
                <MovieLists
                    endpoint="popular"
                    listTitle="Populär" />
                <MovieLists
                    endpoint="top_rated"
                    listTitle="Am besten bewertet" />
            </div>
        </section>
    )
}

export default HomeSection;