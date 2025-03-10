import Image from 'next/image';
import styles from '../styles/Calculator.module.css';

const LinkedInLogo = () => {
  return (
    <a
      href="www.linkedin.com/in/bilal-waseem-b44006338" // Replace with your LinkedIn profile URL
      target="_blank"
      rel="noopener noreferrer"
      className={styles.linkedinLogo}
    >
      <Image
        src="/logo.webp" // Add your LinkedIn logo in the public folder
        alt="LinkedIn Logo"
        width={40}
        height={40}
      />
    </a>
  );
};

export default LinkedInLogo;