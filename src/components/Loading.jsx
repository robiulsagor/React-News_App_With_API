import React from 'react'

const Loading = () => {
    return (
        <div className='d-flex justify-content-between align-items-center py-3'>
            <span className='fs-5'>Loading...</span>

            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading