const useRoutes = () => {
  const buildPublicUrl = (path) => `https://mrvallis.co.uk${path}`;
  const buildImagePath = (path) => `/image/${[path]}`;

  return {
    buildPublicUrl,
    buildImagePath,
  };
};

export default useRoutes;
