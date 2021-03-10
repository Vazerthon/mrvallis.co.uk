import qs from 'qs';

const useRoutes = () => {
  const buildPublicUrl = (path) => `https://mrvallis.co.uk${path}`;
  const buildImagePath = (title) => qs.stringify({ photo: title }, { addQueryPrefix: true });
  const getTitleFromImagePath = (search) => qs.parse(search, { ignoreQueryPrefix: true }).photo;

  return {
    buildPublicUrl,
    buildImagePath,
    getTitleFromImagePath,
  };
};

export default useRoutes;
