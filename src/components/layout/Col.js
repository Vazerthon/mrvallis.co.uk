import styled from '@emotion/styled';

const Col = styled.div`
  display: flex;
  flex-direction: column;
  ${({ alignItemsCentre }) => alignItemsCentre && 'align-items: center;'}
  ${({ justifyCentre }) => justifyCentre && 'justify-content: center;'}
`;

export default Col;
