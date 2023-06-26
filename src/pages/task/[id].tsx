import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";

import { db } from "../../services/FirebaseConnection";
import { doc, collection, query, where, getDoc, addDoc, getDocs, orderBy, deleteDoc } from "firebase/firestore";
import { Textarea } from "@/components/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

import { FaTrash } from 'react-icons/fa'

interface TaskProps {
  id: string
  created: Date
  public: boolean
  content: string
  user: string
}

interface CommnetsProps {
  id: string;
  comment: string
  user: string,
  name: string,
  taskId: string
}

export default function Task({ task, allCommnets }: { task: TaskProps, allCommnets: CommnetsProps[] }) {

  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [comments, setComments] = useState(allCommnets)


  async function handleComment(event: FormEvent) {
    event.preventDefault()

    if (input == '') return;
    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        comment: input,
        created: new Date(),
        user: session.user.email,
        name: session.user.name,
        taskId: task.id
      })

      setInput('')

      const newComment: CommnetsProps = {
        id: docRef.id,
        comment: input,
        user: session.user.email,
        name: session.user.name,
        taskId: task.id
      }

      setComments(oldItems => [...oldItems, newComment])

    } catch (err) {
      console.log(err)
    }

  }

  async function handleDeleteComment(id: string) {
    try {
      await deleteDoc(doc(db, 'comments', id))
      alert('Deleted comment!')
      setComments(oldItems => oldItems.filter(item => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefa - Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Task</h1>
        <article className={styles.task}>
          <p>{task.content}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Leave your comment</h2>

        <form onSubmit={handleComment}>
          <Textarea
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(e.target.value)
            }}
            placeholder="Type your comment..."
          />
          <button
            disabled={!session?.user}
            className={styles.button}
          >
            Send comment
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos comentários</h2>
        {comments.length === 0 && (
          <span>Nenhum comentário foi encontrado...</span>
        )}

        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headCommnet}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === session?.user?.email &&
                <button
                  className={styles.buttonTrash}
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <FaTrash size={18} color="#EA3140" />
                </button>
              }
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>

    </div>
  );
}




export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tasks", id);

  const commentQuery = await getDocs(query(
    collection(db, 'comments'),
    where('taskId', '==', id)
  ))

  const comments: CommnetsProps[] = []
  commentQuery.forEach(doc => {
    comments.push({
      id: doc.id,
      comment: doc.data().comment,
      name: doc.data().name,
      taskId: doc.data().taskId,
      user: doc.data().user
    })
  })

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined || !snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    content: snapshot.data()?.content,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    id: id,
  };

  return {
    props: {
      task,
      allCommnets: comments
    },
  };
};
