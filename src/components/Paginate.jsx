import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'

const Paginate = () => {
    const [isEditable, setIsEditable] = useState(false)
    const [jump, setJump] = useState(1)

    const { currentPage, setCurrentPage, totalPages, handlePaginate, handlePageJump } = useContext(MyContext)

    const handleDoubleTap = () => {
        setIsEditable(!isEditable)
    }

    useEffect(() => {
        setJump(currentPage)
    }, [])

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <button type='button' className='btn btn-warning' onClick={() => handlePaginate('prev')}
                disabled={currentPage == 1}
            >Previous</button>
            {isEditable ? <input type='number' value={jump} onChange={e => setJump(e.target.value)} onKeyDown={(e) => handlePageJump(e, jump)} autoFocus />
                :
                <div style={{ userSelect: 'none', textAlign: 'center' }}
                    onDoubleClick={handleDoubleTap}>
                    {currentPage} of {totalPages} <br />
                    <small> Double tap to Jump to Page</small>
                </div>
            }

            <button type='button' className='btn btn-warning' onClick={() => handlePaginate('next')}
                disabled={currentPage == totalPages}
            >Next</button>
        </div >
    )
}

export default Paginate

