import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import '../styles/NavBar.css'
import '../styles/home.css'
import '../styles/SignUp.css'
import '../styles/Menu.css'
import '../styles/Profile.css'
import '../styles/Settings.css'
import { PhotosProvider } from '../context/PhotosContext';
import NavBar from '../components/NavBar'
import { ContextAuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return(
    <div>
      <ContextAuthProvider>
        <PhotosProvider>
          <NavBar />
          <Component {...pageProps} />
        </PhotosProvider>
      </ContextAuthProvider>
    </div>
  )
}

export default MyApp
