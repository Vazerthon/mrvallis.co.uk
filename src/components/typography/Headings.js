import styled from '@emotion/styled';
import media from 'css-in-js-media';
import theme from '../theme';

export const H1 = styled.h1`
  margin: 0 0 -${theme.spacing.units(2)} 0;
  font-size: ${theme.spacing.units(20)};
  line-height: ${theme.spacing.units(16)};
  font-family: ${theme.typography.fontFamilyHeading};
`;

export const H2 = styled.h2`
  margin: 0;
  margin-bottom: ${theme.spacing.units(0.5)};
  font-size: ${theme.spacing.units(7)};
  ${({ dark }) => dark && `color: ${theme.colour.cmyk.key};`}

  ${({ smallOnMobile }) => smallOnMobile && media('<=tablet')} {
    font-size: ${theme.spacing.units(4)};
    line-height: ${theme.spacing.units(4)};
    margin: 0;
  }
`;

export const H3 = styled.h3`
  margin: 0;
  margin-bottom: ${theme.spacing.units(6)};
  font-size: ${theme.spacing.units(6)};
  transform: rotate(-3deg);
  text-decoration: underline ${theme.colour.cmyk.cyan};
`;
