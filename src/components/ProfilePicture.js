import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import media from 'css-in-js-media';
import theme from './theme';
import useIsClient from '../hooks/useIsClient';

const PictureDesktop = styled(Image)`
  float: right;
  border-radius: 50%;
  border: 4px solid ${theme.colour.cmyk.yellow};
  ${media('<=tablet')} {
    display: none !important;
  }
`;

const PictureMobile = styled(Image)`
  border-radius: 50%;
  border: 4px solid ${theme.colour.cmyk.yellow};
  ${media('>tablet')} {
    display: none;
  }
`;

export default function ProfilePicture({ picture }) {
  if (!useIsClient()) {
    return <></>;
  }

  return (
    picture && (
      <>
        <PictureDesktop fixed={picture.fixed.fixed} alt="" />
        <PictureMobile fluid={picture.fluid.fluid} alt="" />
      </>
    )
  );
}

ProfilePicture.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  picture: PropTypes.object.isRequired,
};
