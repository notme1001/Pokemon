import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <title> Kunci </title>
        <link rel="stylesheet" type="text/css" href="/styles/nprogress.css" />
        <link rel="stylesheet" type="text/css" href="/styles/index.css" />
        <link rel="shortcut icon" type="image/jpg" href="/icons/pokeball.svg"/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
