import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { useRef, useState } from 'react';
import './ButtonPages.scss';
import { VscSearch } from 'react-icons/vsc';

const ButtonPages = ({ page, totalPages, setPage }) => {

    const [alert, setAlert] = useState(false)
    const selectPage = useRef()

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
        <div className='pagination-controls'>
            <div className='container__button-pages'>
                <button aria-label='erste Seite' className='buttonPage' onClick={()=>setPage(1)}>1</button>
                <button aria-label='vorherige Seite' className='buttonPage' disabled={page === 1} onClick={()=>setPage(page - 1)}><AiOutlineLeft /></button>
                <div className='buttonPage'>{page}</div>
                <button aria-label='nächste Seite' className='buttonPage' disabled={page === totalPages} onClick={()=>setPage(page + 1)}><AiOutlineRight /></button>
                <button aria-label='letzte Seite' className='buttonPage' onClick={()=>setPage(totalPages)}>{totalPages}</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="select-page">Seitenzahl eingeben</label>
                <input ref={selectPage} onInput={handleInput} min="1" max={totalPages} id='select-page' type='number' className=""></input>
                {alert && <p>Bitte geben Sie eine gültige Zahl zwischen 1 und {totalPages} ein.</p>}
                <button className='buttonPage' onClick={handleSelectedPage}><VscSearch/></button>
            </form>
        </div>
    )
}

export default ButtonPages