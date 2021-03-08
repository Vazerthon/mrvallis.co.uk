import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import PageContainer from './PageContainer';
import Gallery from '../Gallery';
import Nav from '../Nav';
import Row from './Row';
import {
  Grid,
  TitleContainer,
  NavContainer,
  HeadingContainer,
  AboutContainer,
  PictureContainer,
  ContactBlurbContainer,
  ContactLinksContainer,
  GalleryContainer,
  FooterContainer,
  HeaderContainer,
} from './Grid';

import theme from '../theme';
import { Email, Facebook, Insta, Phone, Twitter, GitHub } from '../Icons';
import Paragraph from '../typography/Paragraph';
import { H1, H2, H3 } from '../typography/Headings';
import Link from '../Link';
import Separator from './Separator';
import ProfilePicture from '../ProfilePicture';

const MainNav = styled(Nav)`
  text-align: right;
`;

const IconRow = styled(Row)`
  margin-bottom: ${theme.spacing.units(4)};

  > * {
    margin-right: ${theme.spacing.units(2)};
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  * {
    margin: 0 ${theme.spacing.units(2)};
  }
`;

export default function IndexPageTemplate({
  title,
  heading,
  about,
  contact,
  picture,
  hidden,
  gallery,
}) {
  const { email, phone, insta, facebook, twitter, github, blurb } = contact;
  const { keywords, pageDescription, richPreviewImage } = hidden;

  const contacts = [
    {
      Icon: Email,
      link: `mailto:${email}`,
      label: email,
      descriptiveLabel: 'Email',
      show: !!email,
    },
    {
      Icon: Phone,
      link: `tel:${phone}`,
      label: phone,
      descriptiveLabel: 'Phone',
      show: !!phone,
    },
    {
      Icon: Insta,
      link: `https://www.instagram.com/${insta}`,
      label: insta,
      descriptiveLabel: 'Instagram',
      show: !!insta,
    },
    {
      Icon: Facebook,
      link: `https://www.facebook.com/${facebook}`,
      label: facebook,
      descriptiveLabel: 'Facebook',
      show: !!facebook,
    },
    {
      Icon: Twitter,
      link: `https://www.twitter.com/${twitter}`,
      label: `@${twitter}`,
      descriptiveLabel: 'Twitter',
      show: !!twitter,
    },
    {
      Icon: GitHub,
      link: `https://www.github.com/${github}`,
      label: github,
      descriptiveLabel: 'GitHub',
      show: !!github,
    },
  ];

  return (
    <PageContainer
      title={title}
      description={pageDescription}
      keywords={keywords}
      richPreviewImage={richPreviewImage}
    >
      <HeaderContainer>
        <NavContainer>
          <MainNav />
        </NavContainer>
        <TitleContainer>
          <H1 id="home">{title}</H1>
        </TitleContainer>
        <HeadingContainer>
          <H2>{heading}</H2>
        </HeadingContainer>
      </HeaderContainer>
      <Grid>
        <AboutContainer>
          <H3 id="about">About</H3>
          {about.split('\n').map((paragraph) => (
            <Paragraph key={paragraph}>{paragraph}</Paragraph>
          ))}
        </AboutContainer>
        <PictureContainer>
          <ProfilePicture picture={picture} />
        </PictureContainer>
        <ContactBlurbContainer>
          <H3 id="contact">Contact</H3>
          <Paragraph>{blurb}</Paragraph>
        </ContactBlurbContainer>
        <ContactLinksContainer>
          {contacts.map(
            ({ Icon, link, label, show, descriptiveLabel }) =>
              show && (
                <IconRow key={link} alignItemsCentre>
                  <Icon role="img" aria-label={descriptiveLabel} />
                  <Link tabIndex={0} href={link}>
                    {label}
                  </Link>
                </IconRow>
              ),
          )}
        </ContactLinksContainer>
        <GalleryContainer>
          <H3 id="gallery">Gallery</H3>
          <Gallery images={gallery} />
        </GalleryContainer>
        <FooterContainer>
          <Footer>
            {contacts.map(
              ({ link, descriptiveLabel, show }) =>
                show && (
                  <Link key={descriptiveLabel} tabIndex={0} href={link}>
                    {descriptiveLabel}
                  </Link>
                ),
            )}
          </Footer>
          <Separator />
        </FooterContainer>
      </Grid>
    </PageContainer>
  );
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  contact: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    insta: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    github: PropTypes.string,
    blurb: PropTypes.string.isRequired,
  }).isRequired,
  hidden: PropTypes.shape({
    keywords: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    richPreviewImage: PropTypes.shape({
      publicURL: PropTypes.string,
    }),
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  picture: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  gallery: PropTypes.array.isRequired,
};
