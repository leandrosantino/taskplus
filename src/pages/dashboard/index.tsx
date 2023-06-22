import Head from 'next/head'
import styles from './styles.module.scss'
import { FaShare, FaTrash } from 'react-icons/fa'
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
        <section className={styles.taskContainer}>
          <h1>My Tasks</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PUBLIC</label>
              <button className={styles.shareButton} >
                <FaShare size={22} color="#3182FF" />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sed non nihil perferendis reiciendis odio pariatur quod, suscipit cupiditate ullam eum obcaecati. Beatae, officia explicabo quia tenetur consequuntur itaque obcaecati?</p>
              <button className={styles.trashButton}>
                <FaTrash size={24} color='#EA3140' />
              </button>
            </div>

          </article>

        </section>

      </main>

    </div>
  )
}

