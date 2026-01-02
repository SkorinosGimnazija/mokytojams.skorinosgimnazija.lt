import { Image } from '@mantine/core'
import React, { lazy, Suspense } from 'react'

interface Props {
  children: string;
}

const MarkdownToJsx = lazy(() =>
  import('markdown-to-jsx').then(module => ({ default: module.default }))
)

export function Markdown({ children }: Props) {
  return (
    <Suspense>
      <MarkdownToJsx
        options={{
          forceBlock: true,
          disableAutoLink: true,
          overrides: {
            a: { props: { target: '_blank', rel: 'noopener noreferrer nofollow' } },
            img: {
              component: Image,
              props: {
                width: 'auto',
                height: 'auto',
                maw: '300px',
                fallbackSrc: 'https://placehold.co/300x300?text=No+image+preview'
              }
            }
          }
        }}
        children={children}
      />
    </Suspense>
  )
}