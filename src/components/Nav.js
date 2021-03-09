import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';
import Link from './Link';
import theme from './theme';
import useWindow from '../hooks/useWindow';
import { BurgerMenu, Close } from './Icons';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  ${media('<tablet')} {
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    margin-top: ${theme.spacing.units(12)};
    width: 100%;
    background-color: ${theme.colour.cmyk.yellow};

    display: ${({ open }) => (open ? 'flex' : 'none')};
    ${({ open }) => open || 'transform: translateX(100%);'}
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 ${theme.spacing.units(4)};
`;

const NavLink = styled(Link)`
  font-size: ${theme.spacing.units(6)};
  line-height: ${theme.spacing.units(10)};
`;

const MobileMenuButton = styled.button`
  background: transparent;
  transform: scale(1.5);
  margin: ${theme.spacing.units(4)};
  border: none;
  display: none;
  float: right;

  ${media('<tablet')} {
    display: flex;
  }
`;

const NavListItem = ({ href, active, label, onClick }) => (
  <ListItem>
    <NavLink tabIndex="0" href={href} active={active} onClick={onClick}>
      {label}
    </NavLink>
  </ListItem>
);

NavListItem.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Nav({ className }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeDrawer = () => setMobileDrawerOpen(false);
  const Wrapper = mobileDrawerOpen ? FocusTrap : Fragment;
  const { window } = useWindow();
  const activeUrl = window?.location?.hash;

  return (
    <Wrapper>
      <nav className={className}>
        <MobileMenuButton
          type="button"
          onClick={toggleDrawer}
          aria-label={
            mobileDrawerOpen ? 'close navigation menu' : 'open navigation menu'
          }
        >
          {mobileDrawerOpen && <Close />}
          {!mobileDrawerOpen && <BurgerMenu />}
        </MobileMenuButton>
        <List role="list" open={mobileDrawerOpen}>
          <NavListItem
            href="#home"
            active={activeUrl === '#home'}
            label="Home"
            onClick={closeDrawer}
          />
          <NavListItem
            href="#about"
            active={activeUrl === '#about'}
            label="About"
            onClick={closeDrawer}
          />
          <NavListItem
            href="#contact"
            active={activeUrl === '#contact'}
            label="Contact"
            onClick={closeDrawer}
          />
          <NavListItem
            href="#gallery"
            active={activeUrl === '#gallery'}
            label="Gallery"
            onClick={closeDrawer}
          />
        </List>
      </nav>
    </Wrapper>
  );
}

Nav.propTypes = {
  className: PropTypes.string,
};

Nav.defaultProps = {
  className: undefined,
};
