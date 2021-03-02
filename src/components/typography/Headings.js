import styled from '@emotion/styled';
import theme from '../theme';

export const H1 = styled.h1`
  margin: 0 0 -${theme.spacing.units(2)} 0;
  font-size: 5rem;
  line-height: 4rem;
  font-family: ${theme.typography.fontFamilyHeading};
`;

export const H2 = styled.h2`
  margin: 0;
  margin-bottom: ${theme.spacing.units(0.5)};
  font-size: 1.75rem;
  ${({ dark }) => dark && `color: ${theme.colour.cmyk.key};`}
`;

export const H3 = styled.h3`
  margin: 0;
  margin-bottom: ${theme.spacing.units(6)};
  font-size: 1.5rem;
  transform: rotate(-3deg);
  text-decoration: underline ${theme.colour.cmyk.cyan};
`;
