import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import theme from './theme';

const PictureDesktop = styled(GatsbyImage)`
  border-radius: 50%;
  border: ${theme.spacing.units(0.5)} solid ${theme.colour.cmyk.yellow};
`;

export default function ProfilePicture({ picture }) {
  return (
    picture && (
      <PictureDesktop image={picture.childImageSharp.gatsbyImageData} alt="" />
    )
  );
}

ProfilePicture.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  picture: PropTypes.object.isRequired,
};
