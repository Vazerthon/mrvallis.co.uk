import PropTypes from 'prop-types';
import media from 'css-in-js-media';
import Masonry from 'react-masonry-component';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Col from '../layout/Col';
import Button from '../Button';
import LargeImageModal from './LarageImageModal';

import useGallery from '../../hooks/useGallery';

import theme from '../theme';

const desktopPlus = css`
  ${media('<desktop')} {
    display: none;
  }
`;

const lessThanDesktop = css`
  ${media('>=desktop')} {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  margin: 0;
  outline: none;
  cursor: pointer;

  .gatsby-image-wrapper {
    border: ${theme.spacing.units(0.5)} solid transparent;
  }

  :focus {
    .gatsby-image-wrapper {
      border-color: ${theme.colour.cmyk.cyan};
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${theme.spacing.units(4)};
  grid-template-columns: 1fr;
  grid-template-areas:
    'filters'
    'pictures';

  ${media('>=desktop')} {
    grid-template-columns: 1fr 5fr;
    grid-template-areas: 'filters pictures';
  }
`;

const Filters = styled.div`
  grid-area: filters;
`;

const Pictures = styled.div`
  grid-area: pictures;
`;

const Select = styled.select`
  background: none;
  border: 1px solid ${theme.colour.cmyk.magenta};
  font-size: ${theme.spacing.units(4)};
  padding: ${theme.spacing.units(1)};
  color: ${theme.colour.cmyk.magenta};
  text-transform: capitalize;
  background-image: none;
`;

export default function Gallery({ images }) {
  const {
    openModalFor,
    closeModal,
    keyboardHandlers,
    allTags,
    filteredImages,
    activeImage,
    activeTag,
    setFocusedImage,
    setActiveTag,
  } = useGallery(images);

  return (
    <Grid>
      <Filters>
        <Col css={desktopPlus}>
          {allTags.map((tag) => (
            <Button
              key={tag}
              type="button"
              active={tag === activeTag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </Col>
        <Col css={lessThanDesktop}>
          <Select
            aria-label="Select gallery filter"
            value={activeTag}
            onChange={({ currentTarget }) => setActiveTag(currentTarget.value)}
          >
            {allTags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </Select>
        </Col>
      </Filters>
      <Pictures>
        <Masonry>
          {filteredImages.map(
            ({ small, large, description, id, title }) => (
              <ImageWrapper
                key={id}
                onClick={openModalFor({ img: large, description, title })}
                onFocus={() => setFocusedImage({ img: large, description, title })}
                onKeyDown={keyboardHandlers}
                tabIndex={0}
              >
                <GatsbyImage
                  image={small}
                  alt={description}
                />
              </ImageWrapper>
            ))}
        </Masonry>
        {activeImage && (
        <LargeImageModal
          open
          onClickOutside={closeModal}
          onCloseClick={closeModal}
          image={activeImage}
        />
        )}
      </Pictures>
    </Grid>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      alt: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      small: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      large: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      fluid: PropTypes.object,
    }),
  ).isRequired,
};
