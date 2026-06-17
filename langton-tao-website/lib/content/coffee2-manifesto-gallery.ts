export type Coffee2ManifestoStackLayout = {
  x: string
  y: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type Coffee2ManifestoScatterLayout = {
  left: string
  top: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type Coffee2ManifestoImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  stack: Coffee2ManifestoStackLayout
  scatter: Coffee2ManifestoScatterLayout
}

export const coffee2ManifestoGalleryMeta = {
  eyebrow: 'Community · 社群',
  title: '社群',
  tagline: '人生大事的路上，你不孤单',
  helper: '一杯咖啡，一段诚实对话',
} as const

export const coffee2ManifestoImages: readonly Coffee2ManifestoImage[] = [
  {
    id: 'manifesto-1',
    src: '/static/bearbitcoffee/manifesto/manifesto-1.jpg',
    alt: '熊比特咖啡 manifesto 1',
    width: 1707,
    height: 1280,
    stack: {
      x: '-5%',
      y: '-3%',
      rotate: -8,
      scale: 0.92,
      zIndex: 7,
      width: 'clamp(6.5rem, 15.5vw, 10rem)',
    },
    scatter: {
      left: '15%',
      top: '34%',
      rotate: -4,
      scale: 1,
      zIndex: 2,
      width: 'clamp(10rem, 24vw, 18rem)',
    },
  },
  {
    id: 'manifesto-2',
    src: '/static/bearbitcoffee/manifesto/manifesto-2.jpg',
    alt: '熊比特咖啡 manifesto 2',
    width: 6000,
    height: 4000,
    stack: {
      x: '3%',
      y: '-2%',
      rotate: 5,
      scale: 0.9,
      zIndex: 6,
      width: 'clamp(7rem, 16vw, 10.5rem)',
    },
    scatter: {
      left: '36%',
      top: '26%',
      rotate: 2,
      scale: 1,
      zIndex: 4,
      width: 'clamp(11.5rem, 26vw, 20rem)',
    },
  },
  {
    id: 'manifesto-3',
    src: '/static/bearbitcoffee/manifesto/manifesto-3.jpg',
    alt: '熊比特咖啡 manifesto 3',
    width: 1896,
    height: 1280,
    stack: {
      x: '-2%',
      y: '2%',
      rotate: -3,
      scale: 0.94,
      zIndex: 8,
      width: 'clamp(6.5rem, 15.5vw, 10rem)',
    },
    scatter: {
      left: '60%',
      top: '30%',
      rotate: 5,
      scale: 1,
      zIndex: 8,
      width: 'clamp(11rem, 25vw, 18.5rem)',
    },
  },
  {
    id: 'manifesto-4',
    src: '/static/bearbitcoffee/manifesto/manifesto-4.jpg',
    alt: '熊比特咖啡 manifesto 4',
    width: 1443,
    height: 1082,
    stack: {
      x: '5%',
      y: '4%',
      rotate: 7,
      scale: 0.91,
      zIndex: 4,
      width: 'clamp(6.25rem, 15vw, 9.5rem)',
    },
    scatter: {
      left: '80%',
      top: '36%',
      rotate: -2,
      scale: 1,
      zIndex: 1,
      width: 'clamp(9.5rem, 22vw, 16rem)',
    },
  },
  {
    id: 'manifesto-5',
    src: '/static/bearbitcoffee/manifesto/manifesto-5.jpg',
    alt: '熊比特咖啡 manifesto 5',
    width: 1440,
    height: 1080,
    stack: {
      x: '-4%',
      y: '1%',
      rotate: -6,
      scale: 0.93,
      zIndex: 3,
      width: 'clamp(6.25rem, 15vw, 9.5rem)',
    },
    scatter: {
      left: '16%',
      top: '64%',
      rotate: -3,
      scale: 1,
      zIndex: 5,
      width: 'clamp(10rem, 23vw, 17.5rem)',
    },
  },
  {
    id: 'manifesto-6',
    src: '/static/bearbitcoffee/manifesto/manifesto-6.jpg',
    alt: '熊比特咖啡 manifesto 6',
    width: 1440,
    height: 1080,
    stack: {
      x: '2%',
      y: '-4%',
      rotate: 4,
      scale: 0.89,
      zIndex: 2,
      width: 'clamp(6.25rem, 15vw, 9.5rem)',
    },
    scatter: {
      left: '48%',
      top: '64%',
      rotate: 1,
      scale: 1,
      zIndex: 6,
      width: 'clamp(11rem, 25vw, 19rem)',
    },
  },
  {
    id: 'manifesto-7',
    src: '/static/bearbitcoffee/manifesto/manifesto-7.jpg',
    alt: '熊比特咖啡 manifesto 7',
    width: 1279,
    height: 1706,
    stack: {
      x: '0%',
      y: '0%',
      rotate: -2,
      scale: 0.95,
      zIndex: 1,
      width: 'clamp(5.75rem, 13vw, 8.75rem)',
    },
    scatter: {
      left: '74%',
      top: '63%',
      rotate: -5,
      scale: 1,
      zIndex: 7,
      width: 'clamp(8rem, 17vw, 13.5rem)',
    },
  },
] as const
