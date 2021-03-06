import React, { useState } from 'react';
import PropTypes from 'prop-types';
import media from 'css-in-js-media';
import Masonry from 'react-masonry-component';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { H2 } from './typography/Headings';
import Paragraph from './typography/Paragraph';
import Col from './layout/Col';
import Modal from './Modal';
import Button from './Button';

import useKeyboard from '../hooks/useKeyboard';

import theme from './theme';

const darkBackground = css`
  background-color: ${theme.colour.cmyk.key};
`;

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

const deDupedList = (list) => Array.from(new Set(list));
const defaultSorting = (a, b) => (a > b ? 1 : -1);

export default function Gallery({ images }) {
  const [activeImage, setActiveImage] = useState();
  const [focusedImage, setFocusedImage] = useState();
  const [activeTag, setActiveTag] = useState('Top Picks');

  const openModalFor = (image) => () => setActiveImage(image);
  const closeModal = () => setActiveImage(null);

  const handleOpenImageWithKeyboard = openModalFor(focusedImage);
  const { onKeyboardEvent } = useKeyboard({
    Enter: handleOpenImageWithKeyboard,
  });

  const allTags = deDupedList(images.flatMap(({ tags }) => tags)).sort(
    defaultSorting,
  );
  const filteredImages = images.filter(({ tags }) => tags.includes(activeTag));

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
                onKeyDown={onKeyboardEvent}
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
          <Modal
            open
            onClickOutside={closeModal}
            onCloseClick={closeModal}
            contentContainerStyles={darkBackground}
          >
            <LargeImage image={activeImage.img} alt={activeImage.description} />
            <LargeImageTextContainer>
              <div>
                <H2 dark smallOnMobile>
                  {activeImage.title}
                </H2>
                <Paragraph dark smallOnMobile>
                  {activeImage.description}
                </Paragraph>
              </div>
            </LargeImageTextContainer>
          </Modal>
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
