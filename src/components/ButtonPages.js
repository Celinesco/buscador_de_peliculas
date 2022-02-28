import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import './ButtonPages.scss'

const ButtonPages = ({page, totalPages, setPage}) => {

    const firstPage = () =>  page !== 1 && setPage(1);
    const previousPage = () => page !== 1 && setPage( page - 1);
    const nextPage = () => page !== totalPages && setPage( page + 1);
    const lastPage = () => page !== totalPages && setPage(totalPages);

    return (
        <div className="container__button-pages">
            <button className='buttonPage' onClick={firstPage}><AiOutlineDoubleLeft /></button>
            <button className='buttonPage' onClick={previousPage}><AiOutlineLeft /></button>
            <button className='buttonPage' onClick={nextPage}><AiOutlineRight /></button>
            <button className='buttonPage' onClick={lastPage}><AiOutlineDoubleRight /></button>
        </div>
    )
}

export default ButtonPages