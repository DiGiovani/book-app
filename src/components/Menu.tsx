import Home from "../components/icons/Home"
import Profile from "../components/icons/Profile"
import Lib from "../components/icons/Lib"

import Link from "next/link"

import styles from '../styles/Menu.module.css'

export default function Menu() {
  return(
    <ul className={styles.container}>
      <li><Link href="#"><a><Home id={styles.home} />Home</a></Link></li>
      <li><Link href="#"><a><Lib id={styles.id} />Library</a></Link></li>
      <li><Link href="#"><a><Profile id={styles.profile} />Profile</a></Link></li>
    </ul>
  )
}