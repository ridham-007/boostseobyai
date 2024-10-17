import Script from 'next/script';
import React from 'react'

type AdexTypes = {
    pId: string;
}

const AdSense = ({ pId }: AdexTypes) => {
  return (
    <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
        crossOrigin='anonymous'
        strategy='afterInteractive'
    />
  )
}

export default AdSense