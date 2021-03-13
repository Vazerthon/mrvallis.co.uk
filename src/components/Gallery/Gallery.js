import PropTypes from 'prop-types';
import media from 'css-in-js-media';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';

import Col from '../layout/Col';
import Button from '../Button';
import LargeImageModal from './LarageImageModal';

import useGallery from '../../hooks/useGallery';

import theme from '../theme';

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

const DesktopFilters = styled(Col)`
  ${media('<desktop')} {
    display: none;
  }
`;

const MobileFilters = styled(Col)`
  ${media('>=desktop')} {
    display: none;
  }
`;

const Pictures = styled.div`
  grid-area: pictures;

  columns: calc(240px + ${theme.spacing.units(1)}) 6;
  column-gap: 0;
`;

const ImageWrapper = styled.div`
  margin: 0;
  outline: none;
  display: inline-block;
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
        <DesktopFilters>
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
        </DesktopFilters>
        <MobileFilters>
          <Select
            aria-label="Select gallery filter"
            value={activeTag}
            onChange={({ currentTarget }) => setActiveTag(currentTarget.value)}
          >
            {allTags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </Select>
        </MobileFilters>
      </Filters>
      <Pictures>
        {filteredImages.map(
          ({ small, large, description, id, title, publicURL }) => (
            <ImageWrapper
              key={id}
              onClick={openModalFor({ img: large, description, title, publicURL })}
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
      publicURL: PropTypes.string,
    }),
  ).isRequired,
};
