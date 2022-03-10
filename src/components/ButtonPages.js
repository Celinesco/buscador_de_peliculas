import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useRef, useState } from "react";
import './ButtonPages.scss';
import { VscSearch } from "react-icons/vsc";

const ButtonPages = ({ page, totalPages, setPage }) => {

    const [alert, setAlert] = useState(false)
    const selectPage = useRef()
    const firstPage = () => page !== 1 && setPage(1);
    const previousPage = () => page !== 1 && setPage(page - 1);
    const nextPage = () => page !== totalPages && setPage(page + 1);
    const lastPage = () => page !== totalPages && setPage(totalPages);


    const handleInput = () => {
        if (Number(selectPage.current.value) > totalPages || Number(selectPage.current.value) < 0) {
            selectPage.current.value = 1
            setAlert(true)
        }
        else (
            setAlert(false)
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPage(Number(selectPage.current.value))
    }

    const handleSelectedPage = () => {
        setPage(Number(selectPage.current.value))
    }

    return (
        <div className="pagination-controls">
            <div className="container__button-pages">
                <button className='buttonPage' onClick={firstPage}>1</button>
                <button className='buttonPage' onClick={previousPage}><AiOutlineLeft /></button>
                <div className='buttonPage'>{page}</div>
                <button className='buttonPage' onClick={nextPage}><AiOutlineRight /></button>
                <button className='buttonPage' onClick={lastPage}>{totalPages}</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="select-page">Seitenzahl eingeben</label>
                <input ref={selectPage} onInput={handleInput} min="1" max={totalPages} id="select-page" type="number" className=""></input>
                {alert && <p>Bitte geben Sie eine gültige Zahl zwischen 1 und {totalPages} ein.</p>}
                <button className='buttonPage' onClick={handleSelectedPage}><VscSearch/></button>
            </form>
        </div>
    )
}

export default ButtonPages