import styled from '@emotion/styled';
import theme from '../theme';

const Paragraph = styled.p`
  margin: 0;
  font-size: ${theme.spacing.units(4)};
  line-height: ${theme.spacing.units(6)};
  ${({ dark }) => dark && `color: ${theme.colour.cmyk.key};`}
`;

export default Paragraph;
