import styled from '@emotion/styled';
import theme from './theme';

const Button = styled.button`
  background-color: ${theme.colour.cmyk.key};
  border: none;
  color: ${theme.colour.cmyk.magenta};
  margin: ${theme.spacing.units(2)};
  font-size: ${theme.spacing.units(4)};
  text-align: left;
  cursor: pointer;
  width: max-content;

  :hover,
  :focus {
    transform: rotate(-3deg);
    text-decoration: underline ${theme.colour.cmyk.cyan};
  }

  ${({ active }) =>
    active && `
      transform: rotate(-3deg);
      text-decoration: underline ${theme.colour.cmyk.cyan};
    `}
`;

export default Button;
