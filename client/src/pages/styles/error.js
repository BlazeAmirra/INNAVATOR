import { css } from 'lit';

const styles = css`
  .errorContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 60px;
    width: 800px;
  }
  .errorImage {
    margin: 50px;
  }

  .errorImage img {
    width: 80px;
    height: 80px;
  }

  .errorLeft {
    display: flex;
    align-item: flex-start;
    flex-direction: column;
  }
  .errorMessage {
    margin-bottom: 20px;
  }
  .errorDetails {
    flex-direction: column;
  }
`;

export default styles;
