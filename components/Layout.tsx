import { FC, ReactNode } from 'react';
import Head from 'next/head'
import Navbar from './Navbar';
import Footer from './Footer';

interface IWrapperProps {
    children: ReactNode;
}

export const Layout: FC<IWrapperProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>RealVoting - Votaciones online</title>
                <meta name="description" content="Voting app" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
