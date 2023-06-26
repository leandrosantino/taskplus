import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import Image from 'next/image'

import heroImg from '@public/assets/hero.png'
import { GetStaticProps } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/FirebaseConnection'

export default function Home({ commentsAmount, tasksAmount }: {
  commentsAmount: number
  tasksAmount: number
}) {

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
            <span>+{tasksAmount} Posts</span>
          </section>
          <section className={styles.box} >
            <span>+{commentsAmount} Comments</span>
          </section>
        </div>

      </main>

    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const comment = await getDocs(collection(db, 'comments'))
  const tasks = await getDocs(collection(db, 'tasks'))

  return {
    props: {
      commentsAmount: comment.size || 0,
      tasksAmount: tasks.size || 0
    },
    revalidate: 60,
  }
}
