import { useContext } from 'react';
import styled from '@emotion/styled';
import theme from '../theme';
import { GlobalMessageContext } from '../../context/GlobalMessageContext';

const GlobalMessageWindow = styled.div`
  position: fixed;
  top: 50%;
  left: calc(50% - ${theme.spacing.units(28)});
  width: ${theme.spacing.units(56)};
  height: ${theme.spacing.units(6)};
  border: ${theme.colour.cmyk.key} 1px solid;
  color: ${theme.colour.cmyk.key};
  background-color: ${theme.colour.cmyk.cyan};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: rotate(-3deg);

  transition: all 300ms ease-in;

  ${({ hide }) => hide && `
      transform: translateY(-2000%);
      opacity: 0;
    `}
`;

export default function GlobalMessage() {
  const { message } = useContext(GlobalMessageContext);

  return (
    <GlobalMessageWindow hide={!message}>
      {message}
    </GlobalMessageWindow>
  );
}
