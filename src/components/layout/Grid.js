import styled from '@emotion/styled';
import media from 'css-in-js-media';
import theme from '../theme';

export const Grid = styled.div`
  max-width: 1440px;
  display: grid;
  grid-gap: ${theme.spacing.units(4)};
  padding: ${theme.spacing.units(4)};
  margin: 0 auto;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'about          picture'
    'contactBlurb   contactLinks'
    'gallery        gallery'
    'footer         footer';

  ${media('<tablet')} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'picture'
      'about'
      'contactBlurb'
      'contactLinks'
      'gallery'
      'footer';
  }
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'nav'
    'title'
    'heading';
`;

export const TitleContainer = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  text-align: right;
  background-color: ${theme.colour.cmyk.yellow};
  color: ${theme.colour.cmyk.key};
`;

export const NavContainer = styled.div`
  background-color: ${theme.colour.cmyk.yellow};
  grid-area: nav;
`;

export const HeadingContainer = styled.div`
  grid-area: heading;
  display: flex;
  flex-direction: row-reverse;
  text-align: right;
`;

export const AboutContainer = styled.div`
  grid-area: about;
`;

export const PictureContainer = styled.div`
  grid-area: picture;
`;

export const ContactBlurbContainer = styled.div`
  grid-area: contactBlurb;
`;

export const ContactLinksContainer = styled.div`
  grid-area: contactLinks;
`;

export const GalleryContainer = styled.div`
  grid-area: gallery;
`;

export const FooterContainer = styled.div`
  grid-area: footer;
`;
