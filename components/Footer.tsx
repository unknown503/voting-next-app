import styles from '../styles/Layout.module.scss'
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© Copyright {new Date().getFullYear()} RealVoting - All Rights Reserved</p>
        </footer>
    )
}
