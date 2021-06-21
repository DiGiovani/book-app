import styles from '../../styles/Book.module.css'

import Oval from '../../components/icons/Oval'
import ArrowLeft from '../../components/icons/ArrowLeft'
import Circle from '../../components/icons/Circle'
import Headphones from '../../components/icons/Headphones'
import OpenBook from '../../components/icons/OpenBook'
import Share from '../../components/icons/Share'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import api from "../../services/api"


export async function getStaticPaths() {
  const booksID = ['dsz5AwAAQBAJ', 'rB2ZDQAAQBAJ', 'QlduAgAAQBAJ', 'rISmCgAAQBAJ']
  const paths = booksID.map(book => ({
    params: { id: `${book}` },
  }))
  return {paths, fallback: 'blocking'}
}

export async function getStaticProps({ params }: {params: {id: string}}) {
  const response = await api.get(`volumes/${params.id}`)
  const book = response.data

  return {
    revalidate: 100,
    props: {book}
  }

}

export default function Book({book}) {
  let desc:string = book.volumeInfo.description || '';

  
  const router = useRouter();

  const shareData = {
    title: book.volumeInfo.title,
    text: 'See this book!',
    url: router.asPath,
  }


  const regex = /<b>|<\/b>|<br>|<p>|<\/p>/
  
  let descArr = desc.split(regex);
  descArr = descArr.filter(e => e != '')

  return(
    <div className={styles.container}>
      <button type="button" onClick={() => router.push('/')}><ArrowLeft id={styles.arrowLeft} /></button>
      <header className={styles.header}>
        <Circle id={styles.bigCircle} />
        <Circle id={styles.smallCircle} />
        <Oval id={styles.oval} />
        <div id={styles.pink}>
        </div>
        <div id={styles.blue}>
        </div>

        {
          book.volumeInfo.imageLinks ? (
            <Image src={book.volumeInfo.imageLinks.thumbnail} width="100" height="150" alt=""/>
          ) : (
            <div style={{width: '100px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF'}}> <p>No thumbnail</p> </div>
          )
        }
      </header>
      <main className={styles.main}>
        <h1>{book.volumeInfo.title} : <span>{book.volumeInfo.subtitle}</span></h1>
        <h2>{book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown' }</h2>

        {
          descArr.map(p => {
            const replaceRegex = /<i>|<\/i>/gi

            p = p.replace(replaceRegex, '')

            return(
              <p key={p}>{p}</p>
            )
          })
        }
      </main>

      <div className={styles.menu}>
        <ul>
          <li><Link href={book.accessInfo.webReaderLink} ><a><OpenBook id={styles.openBook} />Read</a></Link></li>
          <li><Link href={book.accessInfo.webReaderLink} ><a><Headphones id={styles.headphones} />Listen</a></Link></li>
          <li><button onClick={async () => await navigator.share(shareData)} ><Share id={styles.share} />Share</button></li>
        </ul>
      </div>
    </div>
  )
}