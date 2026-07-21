import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'hhh',
  description:
    '웹 표준과 웹 접근성을 준수한 UI를 구현하는 3년 차 웹 퍼블리셔 송은경의 포트폴리오.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
    >
      <body className="font-sans antialiased grain vignette">
        {children}
      </body>
    </html>
  )
}
