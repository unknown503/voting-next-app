import styles from '../styles/Layout.module.scss'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session, status } = useSession()

    const logoutHandler = async (): Promise<void> => await signOut()
    
    return (
        <nav className={styles.nav}>
            <Link href='/' className={styles.logo}><span>Real</span>Voting</Link>
            <ul>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/vote">Votar</Link></li>
                {
                    !session && status !== "loading" &&
                    <li><Link href="/login">Iniciar sesión</Link></li>
                }
                {
                    session &&
                    <li><a onClick={logoutHandler}>Cerrar sesión</a></li>
                }
            </ul>
        </nav>
    )
}
