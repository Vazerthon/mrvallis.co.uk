import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import { Share } from './Icons';
import Row from './layout/Row';

import useWindow from '../hooks/useWindow';

import theme from './theme';

const SmallButton = styled.button`
  background-color: ${theme.colour.cmyk.key};
  border: 1px solid ${theme.colour.cmyk.magenta};
  color: ${theme.colour.cmyk.magenta};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  width: ${theme.spacing.units(8)};
  height: ${theme.spacing.units(8)};
  align-items: center;

  :hover,
  :focus {
    transform: rotate(-3deg);
  }

  ${({ smallOnMobile }) => smallOnMobile && media('<=tablet')} {
    width: ${theme.spacing.units(5)};
    height: ${theme.spacing.units(5)};
  }

  z-index: 1;
`;

const SuccessLabel = styled.span`
  color: ${theme.colour.cmyk.key};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(100%)')};
  transition: all 100ms ease-in;

  ${({ smallOnMobile }) => smallOnMobile && media('<=tablet')} {
    font-size: ${theme.spacing.units(3)};
  }
`;

const Container = styled(Row)`
  position: absolute;
  bottom: ${theme.spacing.units(3)};
  right: ${theme.spacing.units(4)};
`;

export default function ShareButton({ smallOnMobile, clipboardContent, successText }) {
  const { addToClipboard } = useWindow();
  const [showSuccess, setShowSuccess] = useState(true);
  let timeout;

  const handleClick = () => {
    addToClipboard(clipboardContent);
    setShowSuccess(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => setShowSuccess(false), 1000);
  };

  return (
    <Container alignItemsCentre>
      <SuccessLabel show={showSuccess} smallOnMobile={smallOnMobile}>
        {successText}
      </SuccessLabel>
      <SmallButton
        type="button"
        aria-label="share"
        smallOnMobile={smallOnMobile}
        onClick={handleClick}
      >
        <Share />
      </SmallButton>
    </Container>
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
