/** @jsx jsx */
// @ts-ignore
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
// @ts-ignore
import React from "react"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

type PostProps = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      canonicalUrl?: string
      body: string
      excerpt: string
      timeToRead?: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post } }: PostProps) => {
  let { siteUrl } = useSiteMetadata();
  let disqusConfig = {
    url: `${siteUrl + post.slug}`,
    identifier: post.slug,
    title: post.title,
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
      />
      <Heading as="h1" variant="styles.h1">
        {post.title}
      </Heading>
      <p sx={{color: `secondary`, mt: 3, a: {color: `secondary`}, fontSize: [1, 1, 2]}}>
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags}/>
          </React.Fragment>
        )}
        {post.timeToRead && ` — `}
        {post.timeToRead && <span>{post.timeToRead} min read</span>}
      </p>
      <section
        sx={{
          my: 5,
          ".gatsby-resp-image-wrapper": {my: [4, 4, 5], boxShadow: shadow.join(`, `)},
          variant: `layout.content`,
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
      <Disqus config={disqusConfig}/>
    </Layout>
  )
}

export default Post
