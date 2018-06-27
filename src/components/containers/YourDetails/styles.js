import css from 'styled-jsx/css'

export default css`
  .zygoteOrderSummaryBanner {
    width: auto;
    background-color: #f8f8f8;
    cursor: pointer;
    border-top: 1px solid #e8e9e9;
    border-bottom: 1px solid #e8e9e9;
    margin: 20px -20px;
    padding: 8px 10px 8px 25px;
    font-size: 0.8em;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    & > div {
      transform: translateY(calc(50%));
    }
  }
  .zygoteTotalPreview {
    float: right;
  }
  .zygoteSummaryTitle {
    float: left;
  }
  .zygoteDownArrow,
  .zygoteUpArrow {
    float: right;
  }
  .zygoteStep2 {
    margin-bottom: 50px;
  }
  .zygoteInputErr input,
  .zygoteInputErr input:focus,
  .zygoteInputErr select,
  .zygoteInputErr select:focus {
    border: 1px solid #f00;
    background-color: rgba(255, 0, 0, 0.1);
    color: #f00;
    margin-bottom: 0;
  }
  .zygoteRowAnim {
    margin-top: -100%;
    transition: margin 0.25s ease-in-out;
  }
  .zygoteAnim {
    margin-top: 0%;
    margin-bottom: 25px;
  }
  .zygoteCheckboxContainer {
    margin-top: 20px;
  }
  .overflowWrapper {
    margin: -20px -20px 0px -20px;
    overflow: hidden;
    padding: 20px 20px 0 20px;
  }
`
