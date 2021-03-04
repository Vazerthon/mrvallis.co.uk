import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import IndexPageTemplate from '../components/layout/IndexPageTemplate';

const capitaliseFirstLetter = (string) => (string.replace(/^\w/, (c) => c.toUpperCase()));
const capitaliseAllWords = (string) => string.replace(/\w\S*/g, capitaliseFirstLetter);

export default function IndexPage({ data }) {
  const pageData = data.pageData.edges[0].node;
  const {
    title,
    heading,
    about,
    contact,
    picture,
    hidden,
  } = pageData.frontmatter;

  const galleryData = data.galleryData.edges;
  const gallery = galleryData.map(({ node }) => ({
    small: node.frontmatter.small.childImageSharp.gatsbyImageData,
    medium: node.frontmatter.medium.childImageSharp.gatsbyImageData,
    large: node.frontmatter.large.childImageSharp.gatsbyImageData,
    title: node.frontmatter.title,
    description: node.frontmatter.description,
    id: node.id,
    tags: node.frontmatter.tags?.map(capitaliseAllWords) || [],
  }));

  return (
    <IndexPageTemplate
      title={title}
      heading={heading}
      about={about}
      contact={contact}
      hidden={hidden}
      picture={picture}
      gallery={gallery}
    />
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    pageData: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              heading: PropTypes.string,
              about: PropTypes.string,
              contact: PropTypes.shape({
                email: PropTypes.string,
                phone: PropTypes.string,
                insta: PropTypes.string,
                facebook: PropTypes.string,
                blurb: PropTypes.string,
                twitter: PropTypes.string,
                gitHub: PropTypes.string,
              }),
              // eslint-disable-next-line react/forbid-prop-types
              picture: PropTypes.object,
              hidden: PropTypes.shape({
                keywords: PropTypes.string,
                pageDescription: PropTypes.string,
              }),
            }),
          }),
        }),
      ),
    }),
    galleryData: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`query IndexPageTemplate {
  pageData: allMarkdownRemark(
    filter: {frontmatter: {queryKey: {eq: "main-page"}}}
  ) {
    edges {
      node {
        frontmatter {
          title
          heading
          about
          contact {
            phone
            email
            insta
            facebook
            github
            twitter
            blurb
          }
          hidden {
            pageDescription
            keywords
          }
          picture {
            fixed: childImageSharp {
              gatsbyImageData(width: 400, height: 400, layout: FIXED)
            }
          }
        }
      }
    }
  }
  galleryData: allMarkdownRemark(
    filter: {frontmatter: {queryKey: {eq: "gallery-picture"}}}
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          description
          tags
          small: image {
            childImageSharp {
              gatsbyImageData(width: 100, layout: FIXED)
            }
          }
          medium: image {
            childImageSharp {
              gatsbyImageData(width: 300, layout: FIXED)
            }
          }
          large: image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`;
