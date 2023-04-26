import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import styles from './style.module.scss'



export default function Header() {

  const { data: session, status } = useSession()

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>
              Task<span>Plus</span>
            </h1>
          </Link>
          {
            session?.user &&
            <Link
              href='/dashboard'
              className={styles.dashboardButton}
            >
              My dashboard
            </Link>
          }
        </nav>

        {
          status === 'loading' ?
            <></> :
            session ?
              <button
                className={styles.loginButton}
                onClick={() => signOut()}
              >
                {session?.user?.name}
              </button> :
              <button
                className={styles.loginButton}
                onClick={() => signIn("google")}
              >
                Login
              </button>
        }


      </section>
    </header>
  )
}


