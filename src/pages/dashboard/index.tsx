import Head from 'next/head'
import styles from './styles.module.scss'
import { FaShare, FaTrash } from 'react-icons/fa'
import { Textarea } from '@/components/textarea'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { db } from '../../services/FirebaseConnection'
import { collection, addDoc, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import Link from 'next/link'

interface TaskProps {
  id: string
  created: Date
  public: boolean
  content: string
  user: string
}

export default function Dashboard({ user }: { user: { email: string } }) {

  const [input, setInput] = useState('')
  const [publicTask, setPublicTask] = useState(false)
  const [taskList, setTaskList] = useState<TaskProps[]>([])


  useEffect(() => {
    (async () => {

      const tasksQuery = query(
        collection(db, 'tasks'),
        orderBy('created', 'asc'),
        where('user', '==', user.email)
      )

      onSnapshot(tasksQuery, (snapshot) => {

        const list = [] as TaskProps[]

        snapshot.forEach(doc => {
          list.push({
            id: doc.id,
            created: doc.data().created,
            content: doc.data().content,
            public: doc.data().public,
            user: doc.data().user,
          })

          setTaskList(list)

        })

      })

    })()
  }, [user.email])

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault()

    if (input === '') return;

    try {

      await addDoc(collection(db, 'tasks'), {
        content: input,
        created: new Date(),
        user: user.email,
        public: publicTask
      })


      setInput('')
      setPublicTask(false)

    } catch (err) {
      console.log(err)
    }

  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${window.location.host}/task/${id}`
    )
    alert('Link da tarefa copiado com sucesso!')
  }

  async function handleDeleteTask(id: string) {
    await deleteDoc(doc(db, 'tasks', id))
  }


  return (
    <div className={styles.container} >

      <Head>
        <title>My tasks Dashboard</title>
      </Head>

      <main className={styles.main} >
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>What is your task</h1>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder='Type What is your task...'
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              />

              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  id="chekbox"
                  checked={publicTask}
                  onChange={(e) => {
                    setPublicTask(e.target.checked)
                  }}
                />
                <label htmlFor="chekbox">Leave task public?</label>
              </div>

              <button className={styles.button} type='submit' >Regsiter</button>
            </form>

          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>My Tasks</h1>


          {taskList.map(task => (
            <article key={task.id} className={styles.task}>

              {task.public &&
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLIC</label>
                  <button className={styles.shareButton} onClick={() => handleShare(task.id)}>
                    <FaShare size={22} color="#3182FF" />
                  </button>
                </div>
              }

              <div className={styles.taskContent}>

                {task.public ?
                  <Link href={`/task/${task.id}`}>
                    <p>{task.content}</p>
                  </Link>
                  :
                  <p>{task.content}</p>
                }

                <button className={styles.trashButton} onClick={() => handleDeleteTask(task.id)}>
                  <FaTrash size={24} color='#EA3140' />
                </button>
              </div>

            </article>
          ))}
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
    props: {
      user: {
        email: session.user.email
      }
    }
  }
}

