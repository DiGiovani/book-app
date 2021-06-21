import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import api from '../services/api'
import styles from '../styles/Home.module.css'

import searchIcon from '/public/icons/search.svg'
import Triangle from '../components/icons/Triangle'
import Oval from '../components/icons/Oval'
import Rectangle from '../components/icons/Rectangle'
import Statistics from '../components/icons/Statistics'
import Book from '../components/icons/Book'
import Circle from '../components/icons/Circle'

import postBackground from '/public/posts/dont-make-me-think.png'
import backgroundCircle from '/public/icons/background-circle.svg'

import Menu from '../components/Menu'

import { useEffect, useState } from 'react'

export async function getStaticProps() {
  const booksID = ['dsz5AwAAQBAJ', 'rB2ZDQAAQBAJ', 'QlduAgAAQBAJ', 'rISmCgAAQBAJ']
  
  const books = await Promise.all(booksID.map(async (ID) => {
    const res = await api.get(`/volumes/${ID}`)
    return res.data
  }))

  return {
    revalidate: 100,
    props: {
      books
    }
  }
}


export default function Home({ books }) {
  const [ search, setSearch ] = useState('')
  const [ isSearching, setIsSearching ] = useState(false)
  const [ searchBookArr, setSearchBookArr ] = useState([])


  const booksID = ['dsz5AwAAQBAJ', 'rB2ZDQAAQBAJ', 'QlduAgAAQBAJ', 'rISmCgAAQBAJ']
  const [booksArr, setBooksArr] = useState([])

  useEffect(() => {
    booksID.map(async (ID) => {
      const res = await api.get(`/volumes/${ID}`)
      setBooksArr([...booksArr, res.data ])
    })

  }, [])
  

  useEffect(() => {
    setIsSearching(true)
    if(search.length <= 0) return setIsSearching(false);
    if(search.length < 3) return;

    const formattedSearch = search.replaceAll(' ', '+')

    api.get(`/volumes?q=${formattedSearch}`).then(res => {
      setSearchBookArr(res.data.items || [])
    }).catch(err => console.error(err))
  }, [search])

  async function loadMore() {
    const length = searchBookArr.length
    const formattedSearch = search.replaceAll(' ', '+')
    
    const res = await api.get(`/volumes?q=${formattedSearch}&startIndex=${length}&maxResult`)

    setSearchBookArr(searchBookArr.concat(res.data.items))
  }

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Book App</title>
        <meta name="description" content="This is an app built for an admission process." />
        <link rel="icon" href="/icons/foton.svg" />
      </Head>

      <header className={styles.header}>
        <div className={styles.inputBlock}>
          <label htmlFor="book">Search book</label>
          <input placeholder="Search book" type="text" name="book" id="book" onChange={e => setSearch(e.target.value)} value={search} />
          <button> <Image src={searchIcon} alt=""/> </button>
        </div>

        <h1>Hi, <span>Mehmed Al Fatih</span> 👋</h1>
      </header>

      <main className={styles.main} style={isSearching ? {display: 'none', opacity: '0'} : {}}>
        <div className={styles.content}>
          <div className={styles.background}>
            <Circle id={styles.backgroundCircle} />
            <Circle id={styles.secondBackgroundCircle} />
          </div>
          <div className={styles.title}>
            <h2>Discover new book</h2>
            <Link href="#" ><a>More</a></Link>
          </div>
          <div className={styles.discover}>         
            

            <div className={styles.cardsContainer}>
              {
                books.map(book => {
                  const thumb = book.volumeInfo.imageLinks.thumbnail
                  const pages = (Math.floor((book.volumeInfo.pageCount)/10))*10
                  return(
                    <div key={book.id} className={styles.bookCard}>
                      <Link href={`/books/${book.id}`}>
                        <a>
                          <Oval id={styles.oval}/>
                          <Triangle id={styles.triangle} />
                          <Rectangle id={styles.rectangle} />

                          <div className={styles.description}>
                            <h1>{book.volumeInfo.title}</h1>
                            <h2>{book.volumeInfo.authors[0]}</h2>

                            <p><Statistics id={styles.statistics} /><b>{`${pages}+`}</b>Read Now</p>
                          </div>

                          <div className={styles.image}>
                            <Image src={thumb} alt="book thumbnail" height="111" width="72" />
                          </div>
                        </a>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
          
        </div>
        

        <div className={styles.content}>
          <div className={styles.current}>
            <div className={styles.title}>
              <h2>Currently Reading</h2>
              <Link href="#"><a>All</a></Link>
            </div>
            
            <Link href={`/books/${books[3].id}`}>
              <a>
                <div className={styles.description}>
                  <div className={styles.icons}>
                    <Oval id={styles.oval}/>
                    <Rectangle id={styles.rectangle}/>
                    <Circle id={styles.circle}/>
                  </div>
                  

                  <div className={styles.image}>
                    <Image alt="" id={styles.image} src={books[3].volumeInfo.imageLinks.thumbnail} width="88" height="130" />
                  </div>
                  
                  
                  <h1>{books[3].volumeInfo.title}</h1>
                  <h2>by {books[3].volumeInfo.authors[0]}</h2>
                  
                  <p><Book id={styles.book}/> Chapter <span>2</span> From 9</p>

                </div>
              </a>
            </Link>
           
          </div>
          
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>Reviews of The Days</h2>
              <Link href="#"><a>All Video</a></Link>
            </div>

            <div className={styles.post}>
              <div className={styles.postPhoto}>
                <Image src={postBackground} alt="Man holding the book Don't Make me Think Revisited"/>
              </div>
              <div className={styles.postDescription}>
                <h1>Don't Make Me Think - Steve Krug</h1>
                <ul className={styles.infoContainer}>
                  <li>Jesse Showalter</li>
                  <li>5.2k Views</li>
                  <li>1 Week ago</li>
                </ul>
                <p>"Don't Make Me Think" by Steve Krug is one of the first books I read when I was getting into digital design. It helped me move from designing things that just "look nice" to designing things that are usable, useful, memorable and simple to learn and use. </p>
              </div>
            </div>
          </div>
          

        </div>
      </main>

      <div className={styles.menu} style={isSearching ? {display: 'none', opacity: '0'} : {}}>
        <Menu />
      </div>
      

      <div className={styles.searchContainer} style={isSearching ? {} : {display: 'none', opacity: '0'} }>
          {
            () => {
              if(isSearching) {
                return(
                  <div className={styles.loading}>
                    <h1>Loading...</h1>
                  </div>
                )
              } 
            }
          }

          {
            searchBookArr.length >= 1 ? (
              <div className={styles.searchArr}>
                {
                  searchBookArr.map(book => {
                    return(
                      <div className={styles.bookContainer} key={book.id}>
                        <Link href={`/books/${book.id}`}>
                          <a>
                            <div className={styles.cover}>
                              {
                                book.volumeInfo.imageLinks ? (
                                  <Image src={book.volumeInfo.imageLinks.thumbnail} width="100" height="150" alt=""/>
                                ) : (
                                  <div style={{width: '100px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <p>No thumbnail</p> </div>
                                )
                              }
                              
                            </div>
                            <div className={styles.title}>
                              <h1>{book.volumeInfo.title}</h1>
                              <h2>by {book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown author` }</h2>
                            </div>
                          </a>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className={styles.instructions}>
                <p>Type at least 3 letters to search.</p>
              </div>
            )
          }
      </div>
      
    </div>
  )
}
