import Link from 'next/link'
import styles from './style.module.scss'


export default function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>
              Task<span>Plus</span>
            </h1>
          </Link>
          <Link
            href='/dashboard'
            className={styles.dashboardButton}
          >
            My dashboard
          </Link>
        </nav>
        <button className={styles.loginButton}>Login</button>
      </section>
    </header>
  )
}
