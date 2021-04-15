import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/index.css'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return(
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
