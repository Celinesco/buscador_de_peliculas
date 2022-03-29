import { useState } from 'react';
import './DecorativeSquares.scss';


const DecorativeSquares = ({squareOrientation}) => {

    const [horizontal, setHorizontal] = useState(squareOrientation === 'horizontal' ? true : false);

    //Male, este componente lo cree para sacar codigo choclo html de los otros componentes, pero de esta forma, el componente se me renderiza como 600 veces (depende el tamanio de la pantalla)
    //No se qué es mejor entonces. Entiendo que la app no es tan pesada, y en este caso no haría mucha diferencia. Pero quizás seria mejor escribir el html, verdad?
    

    return (
        <div className={horizontal ? 'horizontal-square' : 'square'}></div>
    )
}

export default DecorativeSquares;