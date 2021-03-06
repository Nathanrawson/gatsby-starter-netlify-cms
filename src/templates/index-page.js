import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import Profile from '../components/Profile'
import ReactHtmlParser from 'react-html-parser'


export const IndexPageTemplate = ({
  image,
  title,
  heading,
  colorTheme,
  mainColor,
  secondColor,
  profile,

}) => {
  console.log(profile)

  return (
    <div style={{
      backgroundColor: mainColor
    }}>
      <Navbar backgroundColor={mainColor} color={secondColor} />

      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`,
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '150px',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
          <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              backgroundColor: mainColor,
              color: secondColor,
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {title}

          </h1>
          <h3
            className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            style={{
              backgroundColor: mainColor,
              color: secondColor,
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {heading}
            {colorTheme}
          </h3>
        </div>
      </div>
      <section className="section section--gradient">
        {ReactHtmlParser(profile)}
        <Profile />
      </section>
      <Footer backgroundColor={mainColor} color={secondColor} />
    </div>

  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  colorTheme: PropTypes.string,
  profile: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { html } = data.markdownRemark;
  var theme = frontmatter.colorTheme;
  var mainColor;
  var secondColor;
  if (theme == "mod") {
    mainColor = "#d3d4ce"
    secondColor = "#013246"
  } else if (theme == "hip") {
    mainColor = "#e2b86e"
    secondColor = "#315a70"
  }
  else {
    mainColor = "black"
    secondColor = "white"
  }
  console.log(frontmatter)
  return (
    <Layout>
      <IndexPageTemplate
        profile={html}
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        colorTheme={frontmatter.colorTheme}
        mainColor={mainColor}
        secondColor={secondColor}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        colorTheme
        }
      }
    }
  
`
