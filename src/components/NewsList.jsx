import React from 'react'
import NewsItem from './NewsItem'

const NewsList = ({ news }) => {
    return (
        <div>
            {news && news.length < 1 ? <h4 className='text-center p-4 text-danger'>There Is No News!</h4> :
                news.map(item => <NewsItem item={item} key={item.title} />)
            }
        </div>
    )
}

export default NewsList

