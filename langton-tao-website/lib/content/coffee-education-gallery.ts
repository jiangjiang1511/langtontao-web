import type {
  Coffee2ManifestoScatterLayout,
  Coffee2ManifestoStackLayout,
} from '@/lib/content/coffee2-manifesto-gallery'

export type EducationGalleryCategory = 'english' | 'baretscholar' | 'sail'

export type EducationGalleryImage = {
  id: string
  src: string
  alt: string
  category: EducationGalleryCategory
  width: number
  height: number
  stack: Coffee2ManifestoStackLayout
  scatter: Coffee2ManifestoScatterLayout
}

export const educationGalleryImages: readonly EducationGalleryImage[] = [
  {
    id: 'edu-english-1',
    src: '/assets/edu/english1.png',
    alt: '英语课堂活动',
    category: 'english',
    width: 950,
    height: 1016,
    stack: {
      x: '-5%',
      y: '-3%',
      rotate: -8,
      scale: 0.92,
      zIndex: 7,
      width: 'clamp(5.75rem, 13vw, 8.75rem)',
    },
    scatter: {
      left: '15%',
      top: '34%',
      rotate: -4,
      scale: 1,
      zIndex: 2,
      width: 'clamp(8rem, 17vw, 13.5rem)',
    },
  },
  {
    id: 'edu-baretscholar-1',
    src: '/assets/edu/baretscholar1.jpg',
    alt: '博睿学者活动现场',
    category: 'baretscholar',
    width: 1600,
    height: 1067,
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
    id: 'edu-baretscholar-3',
    src: '/assets/edu/baretscholar3.jpeg',
    alt: '博睿学者全球游走',
    category: 'baretscholar',
    width: 1600,
    height: 1600,
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
      width: 'clamp(10rem, 22vw, 17rem)',
    },
  },
  {
    id: 'edu-sail-1',
    src: '/assets/edu/sail1.jpg',
    alt: '哪吒航海训练',
    category: 'sail',
    width: 1204,
    height: 1804,
    stack: {
      x: '5%',
      y: '4%',
      rotate: 7,
      scale: 0.91,
      zIndex: 4,
      width: 'clamp(5.5rem, 12.5vw, 8.25rem)',
    },
    scatter: {
      left: '80%',
      top: '36%',
      rotate: -2,
      scale: 1,
      zIndex: 1,
      width: 'clamp(8.5rem, 18vw, 14rem)',
    },
  },
  {
    id: 'edu-baretscholar-5',
    src: '/assets/edu/baretscholar5.jpg',
    alt: '博睿学者项目学习',
    category: 'baretscholar',
    width: 1080,
    height: 810,
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
    id: 'edu-sail-3',
    src: '/assets/edu/sail3.png',
    alt: '哪吒航海团队协作',
    category: 'sail',
    width: 1871,
    height: 1169,
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
    id: 'edu-sail-5',
    src: '/assets/edu/sail5.jpg',
    alt: '哪吒航海风浪训练',
    category: 'sail',
    width: 4096,
    height: 3072,
    stack: {
      x: '0%',
      y: '0%',
      rotate: -2,
      scale: 0.95,
      zIndex: 1,
      width: 'clamp(6.25rem, 15vw, 9.5rem)',
    },
    scatter: {
      left: '74%',
      top: '63%',
      rotate: -5,
      scale: 1,
      zIndex: 7,
      width: 'clamp(9.5rem, 22vw, 16rem)',
    },
  },
] as const
