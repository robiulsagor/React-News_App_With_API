import { createRef, useContext, useEffect, useRef } from 'react'
import { categories } from '../news'
import { MyContext } from '../MyContext'

const Header = ({ }) => {

    const { searchTerm, setSearchTerm, category, news, changeCategory, handleSearch, totalResults, totalPages, currentPage } = useContext(MyContext)

    const searchRef = useRef()

    useEffect(() => {
        searchRef.current.focus()
    }, [])

    return (
        <div className='my-4'>
            <h1 className="mb-4 text-center display-6 ">Block Buster HeadLines</h1>
            <input type="search"
                className="form-control"
                placeholder='Type Anything &amp; Press Enter To Search'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                ref={searchRef} />

            <div className='mt-2'>
                {Object.keys(categories).map(cat => {
                    return category === categories[cat] ? <button key={cat} type="button" className="btn btn-warning m-1">
                        #{categories[cat]}
                    </button>
                        :
                        <button key={cat} type="button" className="btn btn-light m-1" onClick={() => changeCategory(categories[cat])}>
                            #{categories[cat]}
                        </button>
                })}

            </div>

            {
                news.length > 0 && (
                    <div className="mt-4 d-flex text-muted" style={{ marginBottom: '-16px' }} >
                        <small>About {totalResults} results found</small>
                        <small className='ms-auto'>{currentPage} of {totalPages} </small>
                    </div >
                )
            }
        </div >

    )
}

export default Header