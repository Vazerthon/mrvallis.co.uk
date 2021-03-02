import styled from '@emotion/styled';
import theme from '../theme';

const { cyan, magenta, yellow, key } = theme.colour.cmyk;

const Separator = styled.hr`
  height: ${theme.spacing.units(0.5)};
  margin: ${theme.spacing.units(0.5)};
  border: none;
  background: linear-gradient(to right, ${key}, ${cyan}, ${magenta}, ${yellow}, ${key});
`;

export default Separator;
