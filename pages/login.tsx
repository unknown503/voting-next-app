import { GetServerSideProps, NextPage } from "next"
import { useEffect } from "react";
import styles from '../styles/Login.module.scss'
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const sessionServer = await getSession(context)
    if (sessionServer) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

const login: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])

    const loginRandom = async () => {
        const loginRes = await signIn("credentials", {
            redirect: false
        })

        if (loginRes?.ok) {
            toast.success("Has iniciado sesión")
            router.push("/")
        } else {
            toast.error(loginRes?.error)
        }
    }

    return (
        <>
            <div className={styles.squares}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={styles.page}>
                <div className={styles.box}>
                    <h2>Iniciar sesión</h2>
                    <button className="btn" onClick={loginRandom}>Iniciar con usuario random</button>
                </div>
            </div>
        </>
    )
}
export default login