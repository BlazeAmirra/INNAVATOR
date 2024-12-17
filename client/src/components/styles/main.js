import { css } from 'lit';

const styles = css`
  :host {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-top: 40px; /* Space above */
    margin-bottom: 20px; /* Space below */
    padding: 0 20px; /* Horizontal padding for readability */
  }

  .subtitle {
    font-size: 18px;
    color: #000000;
    text-align: center;
    margin-top: 10px;
  }
`;

export default styles;
