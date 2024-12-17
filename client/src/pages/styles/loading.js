import { css } from 'lit';

const styles = css`
  .loadingContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 500px;
  }

  .loadingTitle {
    padding: 10px;
  }

  .spinner {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .spinner div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(178, 180, 63);
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(178, 180, 63) transparent transparent transparent;
  }

  .spinner div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .spinner div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .spinner div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default styles;
