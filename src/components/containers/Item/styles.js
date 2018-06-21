import css from 'styled-jsx/css'

export default css`
  .zygoteProd {
    margin: 10px auto;
    width: 100%;
    position: relative;
    color: #666667;
    font-size: 0.9em;
  }
  .zygoteProdDelete {
    cursor: pointer;
    line-height: 14px;
    width: 8%;
    font-size: 1.9em;
    font-weight: 300;
    text-align: right;
  }
  .zygoteDecrease,
  .zygoteIncrease {
    text-align: center;
    cursor: pointer;
    font-weight: 300;
    font-size: 1.7em;
    line-height: 0.7em;
    display: inline;
  }
  .zygoteDecrease {
    margin-right: 8px;
  }
  .zygoteIncrease {
    margin-left: 8px;
  }
  .zygoteProdList {
    width: 100%;
  }
  .zygoteProdNameTitle {
    color: #000;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .zygoteProdDesc {
    font-size: 0.8em;
  }
  .zygoteProd > div {
    float: left;
  }
  .zygoteProd:after {
    content: '';
    clear: both;
    display: block;
  }
  .zygoteProdImg img {
    width: 75px;
    border: 0;
  }
  .zygoteProdImg {
    text-align: center;
    width: 17%;
    margin-right: 3%;
  }
  .zygoteProdName {
    width: 32%;
  }

  .zygoteProdQty {
    width: 20%;
    text-align: center;
  }
  .zygoteProdPrice {
    width: 20%;
    text-align: right;
  }
  .zygoteStep2 .zygoteProdDelete,
  .zygoteStep3 .zygoteProdDelete,
  .zygoteStep4 .zygoteProdDelete,
  .zygoteStep2 .zygoteDecrease,
  .zygoteStep3 .zygoteDecrease,
  .zygoteStep4 .zygoteDecrease,
  .zygoteStep2 .zygoteIncrease,
  .zygoteStep3 .zygoteIncrease,
  .zygoteStep4 .zygoteIncrease {
    display: none;
  }
  .zygoteStep2 .zygoteProd div:nth-child(4),
  .zygoteStep3 .zygoteProd div:nth-child(4),
  .zygoteStep4 .zygoteProd div:nth-child(4) {
    float: right;
  }
  .zygoteStep2 .zygoteProd div:nth-child(3),
  .zygoteStep3 .zygoteProd div:nth-child(3),
  .zygoteStep4 .zygoteProd div:nth-child(3) {
    text-align: right;
  }
`
