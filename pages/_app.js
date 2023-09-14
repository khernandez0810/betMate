import '@/styles/globals.css'
import Layout from "../components/Layout"
import { Provider } from 'react-redux';


export default function App({ Component, pageProps }) {
  return (

  <Layout>
  <Component {...pageProps} />
  </Layout>
  );
}
