import { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import { Share } from './Icons';

import useWindow from '../hooks/useWindow';
import { GlobalMessageContext } from '../context/GlobalMessageContext';

import theme from './theme';

const SmallButton = styled.button`
  background-color: ${theme.colour.cmyk.key};
  border: 1px solid ${theme.colour.cmyk.magenta};
  color: ${theme.colour.cmyk.magenta};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  width: ${theme.spacing.units(6)};
  height: ${theme.spacing.units(6)};
  padding: ${theme.spacing.units(0.5)};
  margin-left: ${theme.spacing.units(2)};
  align-items: center;
  display: inline-flex;

  :hover,
  :focus {
    transform: rotate(-3deg);
  }

  ${({ smallOnMobile }) => smallOnMobile && media('<=tablet')} {
    width: ${theme.spacing.units(4)};
    height: ${theme.spacing.units(4)};
  }
`;

export default function ShareButton({ smallOnMobile, clipboardContent, successText }) {
  const { addToClipboard } = useWindow();
  const { showMessage } = useContext(GlobalMessageContext);

  const handleClick = () => {
    addToClipboard(clipboardContent);
    showMessage(successText);
  };

  return (
    <SmallButton
      type="button"
      aria-label="share"
      smallOnMobile={smallOnMobile}
      onClick={handleClick}
    >
      <Share />
    </SmallButton>
  );
}

ShareButton.propTypes = {
  smallOnMobile: PropTypes.bool,
  clipboardContent: PropTypes.string,
  successText: PropTypes.string,
};

ShareButton.defaultProps = {
  smallOnMobile: false,
  clipboardContent: '',
  successText: 'Success!',
};
