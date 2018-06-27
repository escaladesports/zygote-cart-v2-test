import css from 'styled-jsx/css'

export default css`
  .zygotePreviewAddress {
    color: #000;
    font-size: 0.8em;
    font-weight: 600;
    margin-top: -40px;
    margin-left: 28px;
  }
  .zygotePreviewAddressBottom {
    color: #000;
    font-size: 0.8em;
    font-weight: 600;
    margin: 0px 10px 40px 28px;
    & h3 {
      margin-bottom: 5px;
    }
  }
  .zygoteFinalOrderTitle {
    margin-left: 15px;
    font-size: 1.2em;
    font-weight: 200;
    margin-top: 15px;
  }
  .zygoteStep3 {
    margin: 30px 0 20px 0;
  }

  .zygoteStep3 .zygoteOrderSummaryContainer {
    margin: 10px auto;
    background-color: #fff;
    border: none;
  }

  .zygoteBillingNumberContainer {
    position: relative;
  }
  .zygoteCardPreview {
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .zygoteBillingCityContainer {
    width: 40%;
    float: left;
    margin-right: 5%;
  }
  .zygoteBillingStateContainer {
    width: 25%;
    float: left;
    margin-right: 5%;
  }
  .zygoteBillingZipContainer {
    width: 25%;
    float: left;
  }
  .zygotePaymentLineWrapper {
    float: right;
    margin-top: -10px;
    transform: translateY(20%);
  }
  .zygoteBillingExpirationContainer {
    width: 47.5%;
    margin-right: 5%;
    float: left;
  }
  .zygoteBillingSecurityContainer {
    width: 47.5%;
    float: left;
    margin-bottom: 20px;
    &.zygoteInputErr {
      margin-bottom: 0px;
    }
  }
  .zygoteCheckboxContainer {
    margin-top: 20px;
    clear: both;
  }

  .overflowWrapper {
    overflow: hidden;
  }
  .zygoteBillingInfo {
    margin-top: -90%;
    transition: margin 0.25s ease-in-out;
  }
  .zygoteAnim {
    margin-top: 0%;
  }
`
