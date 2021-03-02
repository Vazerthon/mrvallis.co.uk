import styled from '@emotion/styled';
import theme from './theme';

const Link = styled.a`
  text-decoration: none;

  color: ${({ active }) => (active ? theme.colour.cmyk.key : theme.colour.cmyk.magenta)};

  :hover,
  :focus {
    transform: rotate(-3deg);
    text-decoration: underline ${theme.colour.cmyk.cyan};
  }
`;

export default Link;
