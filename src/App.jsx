import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { categories } from './news'
import NewsList from './components/NewsList'
import Loading from './components/Loading'
import Paginate from './components/Paginate'
import { instance } from './utils/axios'
import { MyContext } from './MyContext'

function App() {
  const [err, setErr] = useState('')

  const [news, setNews] = useState([])
  const [totalResults, setTotalResults] = useState()
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [category, setCategory] = useState(categories.technology)
  const [isLoading, setIsLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const MAX_PAGE_SIZE = 5
  let url = `&category=${category}&pageSize=${MAX_PAGE_SIZE}`

  const changeCategory = data => {
    setSearchTerm('')
    setCurrentPage(1)
    setCategory(data)
  }

  const handleSearch = e => {
    if (e.key == "Enter") {
      url += `&q=${searchTerm}`
      fetchData(url)
    }
  }

  const handlePaginate = dir => {
    dir === "next" ? (currentPage < totalPages && setCurrentPage(currentPage + 1)) :
      (currentPage > 1 && setCurrentPage(currentPage - 1))
  }

  const handlePageJump = (e, pageNo) => {
    if (e.key === "Enter") {
      const pageNumber = Number(pageNo)
      pageNumber <= totalPages ? setCurrentPage(pageNumber) : alert("Error: Provide right page number!")
    }
  }

  useEffect(() => {
    url += `&page=${currentPage}&q=${searchTerm}`
    fetchData(url)
  }, [category, currentPage])

  const fetchData = async (url) => {
    setErr('')
    setIsLoading(true)

    return await instance.get(url)
      .then(({ data }) => {
        setNews(data.articles)
        setIsLoading(false)
        setTotalResults(data.totalResults)
      })
      .catch(err => {
        setErr("Error Fetching Data!")
        setIsLoading(false)
        console.log(err)
      })
  }

  useEffect(() => {
    setTotalPages(Math.ceil(totalResults / 5))
  }, [totalResults])

  return (
    <MyContext.Provider value={{ searchTerm, setSearchTerm, handleSearch, category, news, changeCategory, totalResults, totalPages, currentPage, setCurrentPage, handlePaginate, handlePageJump }}>
      <div className='container'>
        <div className="row">
          <div className="col-sm-12 offset-md-2 col-md-8 col-lg-6  ">
            <Header />

            {err && <p className='text-center text-danger display-6'>{err}</p>}

            {isLoading && <Loading isLoading={isLoading} />}

            {(!isLoading && !err) &&
              <div>
                <NewsList news={news} />
                {news.length > 0 && (
                  <>
                    <Paginate />
                  </>
                )
                }
              </div>
            }

          </div>
        </div>
      </div>
    </MyContext.Provider >
  )
}

export default App
