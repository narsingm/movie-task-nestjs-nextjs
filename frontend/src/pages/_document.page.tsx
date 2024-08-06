import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
