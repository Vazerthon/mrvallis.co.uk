import styled from '@emotion/styled';

const Row = styled.div`
  display: flex;
  ${({ alignItemsCentre }) => alignItemsCentre && 'align-items: center;'}
  ${({ justifyCentre }) => justifyCentre && 'justify-content: center;'}
`;

export default Row;
