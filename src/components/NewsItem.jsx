import React from 'react'

const NewsItem = ({ item }) => {

    return (
        <div className='card mb-4'>
            {item.urlToImage
                &&
                <img src={item.urlToImage
                } className='card-img-top' alt='card-img' />
            }

            <div className="card-body">
                <h5 >
                    <a href={item.url} target='_blank'
                        className='decoration-none link-dark'>
                        {item.title}
                    </a>
                </h5>

                <a href={item.url} target='_blank'
                    className='decoration-none link-dark'>
                    {item.content}
                </a>

                <div className="d-flex align-items-center justify-content-between mt-2">
                    <strong>
                        Published at {item.publishedAt}
                    </strong>

                    <small style={{ padding: '.25rem .50rem', background: '#efefef', borderRadius: '4px' }}>{item.source.name}</small>
                </div>

            </div>
        </div>
    )
}

export default NewsItem