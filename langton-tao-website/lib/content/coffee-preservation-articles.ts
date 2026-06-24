export type PreservationArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type CoffeePreservationArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly PreservationArticleBlock[]
}

export const coffeePreservationArticles: readonly CoffeePreservationArticleContent[] =
  [
  {
    id: "fwd-article-richard-li",
    headline: "李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承",
    outlet: "微信公众号",
    sourceUrl: "https://mp.weixin.qq.com/s/F6WChaheUpmJXlE_4jOgtw",
    blocks: [
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-01.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 1",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-02.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 2",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-03.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 3",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-04.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 4",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-05.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 5",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-06.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 6",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-07.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 7",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-08.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 8",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-09.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 9",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-10.png",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 10",
      },
      {
        type: 'image',
        src: "/assets/preservation-articles/fwd-article-richard-li/page-11.jpg",
        alt: "《李泽楷，华人家族第二代的完美典范——从\"薅李家羊毛\"到家族传承》配图 11",
      },
    ],
  },
  ]

export function getCoffeePreservationArticle(id: string) {
  return coffeePreservationArticles.find((article) => article.id === id)
}
