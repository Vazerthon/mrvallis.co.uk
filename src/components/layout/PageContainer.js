import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Global, css } from '@emotion/react';
import useWindow from '../../hooks/useWindow';

import theme from '../theme';

export default function PageContainer({
  children,
  title,
  description,
  keywords,
  richPreviewImage,
}) {
  const { window } = useWindow();
  return (
    <>
      <Global
        styles={css`
          html {
            font-family: ${theme.typography.fontFamilyBody};
            font-size: ${theme.typography.baseFontSizePx}px;
            line-height: ${theme.spacing.units(8)};
            box-sizing: border-box;
            body {
              margin: 0;
              background-color: ${theme.colour.cmyk.key};
              color: ${theme.colour.white};
            }
          }
        `}
      />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={window?.location.href} />
        {richPreviewImage && <meta property="og:image" content={`https://mrvallis.co.uk${richPreviewImage.publicURL}`} />}
      </Helmet>
      {children}
    </>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  richPreviewImage: PropTypes.shape({
    publicURL: PropTypes.string,
  }),
};

PageContainer.defaultProps = {
  richPreviewImage: undefined,
};
