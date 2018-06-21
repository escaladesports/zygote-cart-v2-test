import css from 'styled-jsx/css'
import React from 'react'

export default css`
  .zygoteOpen {
    overflow: hidden;
  }
  .zygoteContainer {
    z-index: 1000;
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    box-sizing: border-box;
    background-color: rgba(0, 207, 255, 0);
    transition: background-color 0.6s;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .zygoteContainerAction {
    background-color: rgba(0, 207, 255, 0.7);
  }
  .zygoteStep1 .zygotePaymentLine {
    margin: 20px 0;
  }
  .zygoteContainer *,
  .zygoteContainer *:before,
  .zygoteContainer *:after {
    box-sizing: border-box;
  }
  .zygoteContainer input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .zygoteContainer select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    cursor: pointer;
  }
  .zygoteContainer select {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='30'><path fill='rgb(102, 102, 103)'
    d='M 35 0 L 40 0 L 22.5 30 L 17.5 30 L 0 0 L 5 0 L 20 25 35 0'
    /></svg>")
      no-repeat;
    background-color: #f8f8f8;
    background-size: 1.8em 0.8em;
    background-position: 90% 50%;
    background-repeat: no-repeat;
  }
  .zygoteSubFieldsContainer {
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    margin-top: 10px;
  }
  .zygoteSubFields {
    width: 95%;
    margin: 0 auto;
    color: #666;
  }
  .zygoteDownArrow,
  .zygoteUpArrow {
    fill: #666667;
    transform: scale(0.5, 0.3);
    cursor: pointer;
  }
  .zygoteSelect {
    position: relative;
    & option {
      color: blue;
    }
  }
  .zygoteContainer a {
    text-decoration: none;
    color: #000;
  }
  .zygoteStep {
    width: 100%;
    padding: 0;
  }
  .zygoteSection:first-of-type {
    margin-bottom: 50px;
  }
  .zygoteSection input,
  select {
    display: block;
    font-size: 0.75em;
    color: #666667;
    height: 40px;
    padding: 10px;
    border: solid 1px #e8e9e9;
    margin-bottom: 20px;
    outline: none;
    width: 100%;
    border-radius: 5px;
    background-color: #f8f8f8;
  }
  .zygoteSection input:focus {
    border: 1px solid #333;
    box-shadow: none;
  }
  .zygoteCouponLine:after,
  .zygoteShipLine:after,
  .zygoteSubLine:after,
  .zygoteTaxLine:after,
  .zygoteProdHeader:after,
  .zygoteStepBtns:after,
  .zygoteTotalLine:after {
    content: '';
    display: block;
    clear: both;
  }
  .zygoteInputMsg {
    display: block;
    margin-bottom: 20px;
    margin-top: 3px;
    font-size: 0.7em;
    color: #f00;
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
  .zygoteShippingAddressContainer input ::placeholder {
    color: #b7b7b7;
    font-style: oblique;
  }
  .zygoteInputErr input ::placeholder,
  .zygoteInputErr select ::placeholder {
    color: #f00;
  }
  .zygoteMsgs > div {
    padding: 7px 10px;
    margin-bottom: 15px;
  }
  .zygoteMsgs > div:last-child {
    margin-bottom: 0;
  }
  .zygoteShippingErrors {
    border: 1px solid #f00;
    color: #f00;
    background-color: rgba(255, 0, 0, 0.1);
    font-size: 0.8em;
    text-align: center;
  }
  .zygoteErrorsTitle {
    font-size: 1.6em;
    padding: 10px 10px 0 10px;
  }
  .zygoteErrorsContact {
    padding-bottom: 15px;
  }
  .zygoteSectionTitle {
    display: block;
    margin: 15px 0;
    color: #000;
    font-size: 1.05em;
    font-weight: 300;
  }
  .zygoteSection label {
    font-size: 0.6em;
    display: inline-block;
    cursor: pointer;
  }
  .zygoteCheckboxContainer {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    font-size: 1em;
    cursor: pointer;
  }
  .zygoteCheckboxContainer input[type='checkbox'],
  .zygoteCheckboxContainer input[type='radio'] {
    position: absolute;
    cursor: pointer;
    height: auto;
    width: auto;
    left: 0;
    margin: 0;
    padding: 0;
    top: 0;
    opacity: 0;
    &:checked ~ .zygoteCheckbox {
      background-color: #666;
      border: none;
    }
    &:checked ~ .zygoteCheckbox:after {
      display: block;
    }
  }
  .zygoteCheckbox {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border: 1px solid #d2d2d2;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 7px;
      top: 1.5px;
      width: 7px;
      height: 14px;
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
      transform: rotate(35deg);
    }
  }

  .zygoteEscaAdd {
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
    background: rgb(0, 207, 255);
    color: white;
    width: 15px;
    height: 15px;
    padding-left: 1.15px;
    font-weight: 300;
    font-size: 1em;
    line-height: 13px;
    border-radius: 100%;
    display: inline-block;
  }
  .zygoteToggleField {
    display: inline-block;
    height: 37px;
    font-size: 0.75em;
  }
  .zygoteToggleFieldContainer {
    transform: translateY(25%);
  }
  .zygoteToggleFieldWrapper {
    width: 47.5%;
    float: left;
    color: #666667;
  }
  .zygoteShippingCompanyNameContainer,
  .zygoteBillingCompanyNameContainer {
    float: right;
  }
  .zygoteToggleFieldContainer {
    margin-bottom: 20px;
  }
  .zygoteShippingCityContainer,
  .zygoteBillingCityContainer {
    width: 68%;
    float: left;
  }
  .zygoteShippingStateContainer,
  .zygoteBillingStateContainer {
    width: 27%;
    float: right;
  }
  .zygoteShippingZipContainer,
  .zygoteBillingZipContainer {
    width: 27%;
  }
  .zygoteSection > div {
    &:after,
    :before {
      content: '';
      clear: both;
      display: block;
    }
  }
  .zygoteLoading {
    width: 100%;
    margin: 20px 0;
  }
  .zygoteLoader {
    width: 50px;
    margin: 0 auto;
  }
`
