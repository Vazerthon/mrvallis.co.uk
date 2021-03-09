import { useState } from 'react';
// import useWindow from './useWindow';
import useKeyboard from './useKeyboard';

const deDupedList = (list) => Array.from(new Set(list));
const defaultSorting = (a, b) => (a > b ? 1 : -1);
const allTagsIn = (images) => deDupedList(images.flatMap(({ tags }) => tags)).sort(defaultSorting);

export default function useGallery(images) {
  // const window = useWindow();

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
