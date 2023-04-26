import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Textarea } from '@/components/textarea'

export default function Dashboard() {
  return (
    <div className={styles.container} >

      <Head>
        <title>My tasks Dashboard</title>
      </Head>

      <main className={styles.main} >
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>What is your task</h1>

            <form action="">
              <Textarea placeholder='Type What is your task...' />

              <div className={styles.checkboxArea}>
                <input type="checkbox" id="chekbox" />
                <label htmlFor="chekbox">Leave task public?</label>
              </div>

              <button className={styles.button} type='submit' >Regsiter</button>
            </form>

          </div>
        </section>
      </main>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
