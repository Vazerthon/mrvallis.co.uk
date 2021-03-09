import { useState, useEffect } from 'react';
import useWindow from './useWindow';
import useKeyboard from './useKeyboard';

const kebabCase = (string) => string.toLowerCase().replaceAll(' ', '-');
const deDupedList = (list) => Array.from(new Set(list));
const defaultSorting = (a, b) => (a > b ? 1 : -1);
const allTagsIn = (images) =>
  deDupedList(images.flatMap(({ tags }) => tags)).sort(defaultSorting);
const imageTitleInUrl = (pathname) =>
  (pathname && pathname.match('image/([a-z]-?)*')
    ? pathname.split('/')[2]
    : undefined);
const makeFindImageByTitle = (images) => (title) =>
  images.find((img) => title === kebabCase(img.title));

export default function useGallery(images) {
  const [initialised, setInitialised] = useState();
  const [activeImage, setActiveImage] = useState();
  const [focusedImage, setFocusedImage] = useState();
  const [activeTag, setActiveTag] = useState('Top Picks');

  const openModalFor = (image) => () => setActiveImage(image);
  const closeModal = () => setActiveImage(null);

  const handleOpenImageWithKeyboard = openModalFor(focusedImage);
  const { onKeyboardEvent } = useKeyboard({
    Enter: handleOpenImageWithKeyboard,
  });

  const allTags = allTagsIn(images);
  const filteredImages = images.filter(({ tags }) => tags.includes(activeTag));

  const { pathname } = useWindow();
  useEffect(() => {
    if (initialised) {
      return;
    }

    const findImageByTitle = makeFindImageByTitle(images);
    const imageTitleFromUrl = imageTitleInUrl(pathname);
    const image = findImageByTitle(imageTitleFromUrl);

    if (image && !activeImage) {
      setInitialised(true);

      setActiveImage({
        img: image.large,
        description: image.description,
        title: image.title,
      });
    }
  }, [activeImage, images, initialised, pathname]);

  return {
    openModalFor,
    closeModal,
    keyboardHandlers: onKeyboardEvent,
    allTags,
    filteredImages,
    activeImage,
    focusedImage,
    activeTag,
    setFocusedImage,
    setActiveTag,
  };
}
