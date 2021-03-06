import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import useKeyboard from '../hooks/useKeyboard';

import theme from './theme';
import { Close } from './Icons';

const ClickOutsideOverlay = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colour.transparentBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  z-index: 1;
`;

const Container = styled.div`
  max-height: 90vh;
  position: relative;
  border: 1px solid ${theme.colour.cmyk.white};
  background-color: ${theme.colour.white};
  border-radius: ${theme.spacing.units(0.5)};
  margin: ${theme.spacing.units(4)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  width: 90%;

  ${media('>tablet')} {
    max-width: 80%;
  }
`;

const ContentContainer = styled.div`
  overflow: hidden;
  width: 100%;
  max-height: 90vh;
  padding: ${theme.spacing.units(4)};
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  border-radius: 50%;
  border-width: ${theme.spacing.units(1)};
  top: ${theme.spacing.units(-5)};
  right: ${theme.spacing.units(-5)};
  width: ${theme.spacing.units(8)};
  height: ${theme.spacing.units(8)};
  display: flex;
  align-items: center;
  border-color: ${theme.colour.cmyk.magenta};
  background-color: ${theme.colour.white};
`;

export default function Modal({
  open,
  onClickOutside,
  onCloseClick,
  children,
  contentContainerStyles,
}) {
  const clickOutsideElement = useRef();
  const { onKeyboardEvent } = useKeyboard({ Escape: onClickOutside });

  const focusClickOutsideElement = () => clickOutsideElement?.current?.focus();
  useEffect(focusClickOutsideElement, [focusClickOutsideElement]);

  return (
    open && (
      <FocusTrap>
        <ClickOutsideOverlay
          ref={clickOutsideElement}
          tabIndex={0}
          onClick={onClickOutside}
          onKeyDown={onKeyboardEvent}
          aria-label="click to close modal"
        >
          <Container onClick={(e) => e.stopPropagation()} role="dialog">
            <ContentContainer css={contentContainerStyles}>{children}</ContentContainer>
            {onCloseClick && (
              <CloseButton
                onClick={onCloseClick}
                type="button"
                aria-label="close modal"
              >
                <Close />
              </CloseButton>
            )}
          </Container>
        </ClickOutsideOverlay>
      </FocusTrap>
    )
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
  onCloseClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  contentContainerStyles: PropTypes.object,
};

Modal.defaultProps = {
  open: false,
  onClickOutside: () => {},
  onCloseClick: undefined,
  contentContainerStyles: undefined,
};
