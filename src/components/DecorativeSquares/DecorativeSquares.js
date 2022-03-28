import './DecorativeSquares.scss';


const DecorativeSquares = ({squareOrientation}) => {
    let horizontal = false;
    if (squareOrientation === 'horizontal') {
        horizontal = true
    } 

    return (
        <div className={horizontal ? 'horizontal-square' : 'square'}></div>
    )
}

export default DecorativeSquares;