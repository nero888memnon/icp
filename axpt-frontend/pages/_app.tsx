import '../styles/animations.css';
import '../styles/theme.css';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { useRouter } from 'next/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext'; // Wrap app with AuthProvider

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>  {/* Ensure AuthProvider wraps the entire app */}
      <Header />
      
      <TransitionGroup>
        <CSSTransition
          key={router.pathname}
          classNames="page-transition"
          timeout={300}
        >
          <Component {...pageProps} />
        </CSSTransition>
      </TransitionGroup>
      
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
