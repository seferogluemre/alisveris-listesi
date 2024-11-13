const { default: styled } = require("styled-components");

export const FormSelectStyled = styled.select`
  padding: 6px 10px;
  width: 170px;
  border: none;
  margin: 10px;
  font-size: 17px;
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid #d4f6ff;
    box-shadow: 0 0 14px #608bc1;
  }
`;
