import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { rhythm } from "../utils/typography"

export default function Layout(props) {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          social {
            github
            twitter
          }
        }
      }
    }
  `)

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        <a
          href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
          target="_blank"
          rel="noopener"
        >
          twitter
        </a>
        {" • "}
        <a
          href={`https://github.com/${data.site.siteMetadata.social.github}`}
          target="_blank"
          rel="noopener"
        >
          github
        </a>
        {" • "}
        <a href={`/rss.xml`}>rss</a>
      </footer>
    </div>
  )
}
