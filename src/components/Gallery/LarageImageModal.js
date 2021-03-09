import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';

import { H2 } from '../typography/Headings';
import Paragraph from '../typography/Paragraph';
import Modal from '../Modal';

import theme from '../theme';
import useWindow from '../../hooks/useWindow';
import useRoutes from '../../hooks/useRoutes';

const darkBackground = css`
  background-color: ${theme.colour.cmyk.key};
`;

const LargeImage = styled(GatsbyImage)`
  max-height: 70vh;
  img {
    object-fit: contain !important;
    max-height: 70vh;
    box-sizing: border-box;
  }
`;

const LargeImageTextContainer = styled.div`
  position: relative;
  left: ${theme.spacing.units(-8)};
  padding-left: ${theme.spacing.units(8)};
  margin-top: ${theme.spacing.units(4)};
  background: ${theme.colour.cmyk.magenta};
  transform: skew(-20deg) scale(1);

  > * {
    transform: skew(20deg);
  }
`;

export default function LargeImageModal({ open, onClickOutside, onCloseClick, image }) {
  const { currentUrl } = useWindow();
  const { buildPublicUrl } = useRoutes();

  return (
    <Modal
      open={open}
      onClickOutside={onClickOutside}
      onCloseClick={onCloseClick}
      contentContainerStyles={darkBackground}
    >
      <Helmet>
        <meta property="og:title" content={`Mr. Vallis | ${image.title}`} />
        <meta property="og:description" content={image.description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={buildPublicUrl(image.publicURL)} />
      </Helmet>
      <LargeImage image={image.img} alt={image.description} />
      <LargeImageTextContainer>
        <div>
          <H2 dark smallOnMobile>
            {image.title}
          </H2>
          <Paragraph dark smallOnMobile>
            {image.description}
          </Paragraph>
        </div>
      </LargeImageTextContainer>
    </Modal>
  );
}

LargeImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  image: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    publicURL: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    img: PropTypes.object,
  }).isRequired,
};
