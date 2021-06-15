import Head from 'next/head'

const CustomHead = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content="width=device-width, initial-scale=1" />
      <meta charSet='utf-8' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description}  />
      <meta property="og:image" content="https://www.mywebsite.com/image.jpg" />
      <meta property="og:image:alt" content="Image description" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content="https://www.mywebsite.com/page" />
      <link rel="canonical" href="https://www.mywebsite.com/page" />
      <title>{title}</title>
      <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap"
            rel="stylesheet"/>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"/>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"/>
    </Head>
  )
}

CustomHead.defaultProps = {
  title: 'Event Management Tool',
  keywords: 'web development, programming, event management, schedule',
  description: 'A simple event management tool',
}

export default CustomHead