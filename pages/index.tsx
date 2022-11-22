import styles from '../styles/Home.module.scss'
import { FaHandPeace, FaChartArea, FaShieldAlt } from 'react-icons/fa';
import { FC, PropsWithChildren } from 'react';
import { useEffect } from "react";
import { useSession } from 'next-auth/react';
import useSetUserState from '../lib/state';

export default function Home() {
  const { status } = useSession()
  const setState = useSetUserState(status)

  useEffect(() => {
    const style = document.body.style
    if (style.overflow === "hidden") style.overflowY = "scroll"
  }, [])

  useEffect(() => {
    setState.catch(console.error)
  }, [status])

  return (
    <>
      <header className={styles.header}>
        <main>
          <section>
            <div className={styles.hero}>
              <h2>Votaciones virtuales</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad modi eveniet, distinctio et asperiores repellendus, quibusdam placeat incidunt cumque qui deserunt in laboriosam commodi aut adipisci amet maxime at iste.</p>
              <div className={styles.buttons}>
                <a href="/vote" className='btn'>Votar</a>
                <a href="/login" className='btn-outline'>Iniciar sesión</a>
              </div>
            </div>
          </section>
        </main>
      </header>
      <section className={styles.features}>
        <img src="images/home/voting.jpg" alt="Voting" loading='lazy' />
        <div>
          <span>Novedades</span>
          <h2>RealVoting</h2>
          <div className={styles.featureGroup}>
            <FeatureCard text="Facilidad">
              <FaHandPeace size="2.2rem" />
            </FeatureCard>
            <FeatureCard text="Estadísticas">
              <FaChartArea size="2.2rem" />
            </FeatureCard>
            <FeatureCard text="Seguridad">
              <FaShieldAlt size="2.2rem" />
            </FeatureCard>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe qui perspiciatis molestias enim, ipsam odio corrupti officia quo inventore doloribus, quaerat ad, placeat officiis nobis possimus tempore eum quos facilis.</p>
          <a href="#" className='btn'>Leer más</a>
        </div>
      </section>
      <section className={styles.portable}>
        <div className={styles.content}>
          <div>
            <span>Portabilidad</span>
            <h2>Lo puedes usar desde cualquier dispositivo</h2>
          </div>
        </div>
        <div className={styles.picture}>
          <img src="images/home/phone.jpg" alt="Portabilidad" loading='lazy' />
        </div>
      </section>
    </>
  )
}

interface IFeatureCard {
  text: string
}

const FeatureCard: FC<PropsWithChildren<IFeatureCard>> = ({ children: icon, text }) => {
  return (
    <div className={styles.feature}>
      <div>
        {icon}
      </div>
      <h3>{text}</h3>
    </div>
  )
}