import MovieLists from "./MovieLists";
import './HomeSection.scss'


const HomeSection = () => {
    return (
        <section className="section__home sections__styles">
            <h2>HOME</h2>
            <div className="container__movie-components">
                <MovieLists
                    endpoint="popular"
                    listTitle="Populär" />
                <MovieLists
                    endpoint="top_rated"
                    listTitle="Gute Bewertungen" />
            </div>


        </section>
    )
}

export default HomeSection;