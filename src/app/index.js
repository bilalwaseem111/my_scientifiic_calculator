import Head from 'next/head';
import Calculator from '../components/Calculator';
import LinkedInLogo from '../components/LinkedInLogo';
import styles from '../styles/globals.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scientific Calculator</title>
        <meta name="description" content="A responsive animated scientific calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calculator />
      <LinkedInLogo />
    </div>
  );
}