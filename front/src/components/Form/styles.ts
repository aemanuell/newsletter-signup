import styled from 'styled-components';

export const Img = styled.div`
    img {
        width: auto;
        height: 459px;
    }
`

export const Container = styled.div`
padding: 20px;
width: 50rem;
height: 31.25rem;
gap: 2.25rem;
margin: auto;
border-radius: 1.875rem;
display: flex;
flex-direction: row-reverse;
justify-content: center;
background-color: hsl(0, 0%, 100%);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  gap: 16px;

  h2 {
    font-size: 36px;
    position: relative;
    top: 30px;
    left: 14%;
    transform: scale(1.3);
    display: block;
    font-weight: bold;
    unicode-bidi: isolate;
  }

  p {
    display: block;
    font-size: 14px;
    position: relative;
    top: 38px;
    left: -1px;
    width: 90%;
    line-height: 20px;
  }

  ul {
    display: block;
    position: relative;
    top: 30px;
    font-size: 0.8125rem;
  }

  ul > li {
    list-style: none;
    display: flex;
    gap: 19px;
    margin-top: 10px;
  }
`;

export const FormLabel = styled.form`
    position: relative;
    top: 30px;
    display: block;

    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 20px;
    }


    label > input {
        width: 340px;
        padding: 13px;
        border-radius: 6px;
        background-color: transparent;
        border: 1px solid hsl(231, 7%, 60%);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
        cursor: pointer;
    }
`

export const ValidationInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
        font-weight: 700;
        font-size: 11px;
    }
`

export const InputButton = styled.button`
    background-color: hsl(234, 29%, 20%);
    color: hsl(0, 0%, 100%);
    font-weight: 400;
    width: 340px;
    padding: 13px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: none;
    border-radius:6px;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
        background: linear-gradient(127deg, rgba(255, 63, 124, 1) 40%, rgba(255, 154, 34, 1) 70%);
    }
`

interface InputProps {
  isValid: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 13px;
  border-radius: 6px;
  border: 1px solid ${({ isValid }) => (isValid ? 'hsl(231, 7%, 60%)' : 'hsl(4, 100%, 67%)')};
`;

export const Button = styled.button`
  background-color: hsl(234, 29%, 20%);
  color: white;
  font-weight: 400;
  width: 335px;
  padding: 13px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    background: linear-gradient(127deg, rgba(255, 63, 124, 1) 40%, rgba(255, 154, 34, 1) 70%);
  }
`;

interface InvalidMessageProps {
  isValid: boolean;
}

export const InvalidMessage = styled.span<InvalidMessageProps>`
  display: ${({ isValid }) => (isValid ? 'none' : 'block')};
  color: hsl(4, 100%, 67%);
  font-weight: 700;
  font-size: 11px;
  position: relative;
  left: -36px;
`;

export const SuccessContainer = styled.div`
    display: block;
    border-radius: 30px;
    width: 330px;
    height: 46vh;
    margin: auto;
    background-color: hsl(0, 0%, 100%);
    transform: translate(16px, 130px);

    img, h2, p {
        position: relative;
        top: 16%;
        left: 7%;
    }

    img {
    width: 39.9px;
    height: 39.9px;
    transform: translate(16px, -23px);
    overflow-clip-margin: content-box;
    overflow: clip;
  }

  h2 {
    display: block;
    transform: translate(16px, -23px);
    font-size: 36px;
    position: relative;
    top: 20%;
  }

  p {
    font-size: 12px;
    width: 260px;
    line-height: 17px;
    transform: translate(16px, -23px);
    position: relative;
    top: 23%;
    display: block;
  }

  p > span {
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
  }
`;

// export const SuccessMessage = styled.div`
  


// `;

export const DismissButton = styled.button`
    width: 260px;
    transform: translate(16px, -120px);
    background-color: hsl(234, 29%, 20%);
    color: hsl(0, 0%, 100%);
    font-weight: 400;
    padding: 13px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    top: 59%;
    left: 7%;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
        background: linear-gradient(127deg, rgba(255, 63, 124, 1) 40%, rgba(255, 154, 34, 1) 70%);
    }
`
