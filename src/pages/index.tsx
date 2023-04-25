import Head from 'next/head'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

import heroImg from '@public/assets/hero.png'

export default function Home() {
  return (
    <div className={styles.container} >

      <Head>
        <title>TaskPlus | Organize your tasks easily</title>
      </Head>

      <main className={styles.main} >
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt='logo taskplus'
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          builded system for you organize <br />
          your studies and tasks
        </h1>

        <div className={styles.infoContent} >
          <section className={styles.box} >
            <span>+12 Posts</span>
          </section>
          <section className={styles.box} >
            <span>+90 Comments</span>
          </section>
        </div>

      </main>

    </div>
  )
}
