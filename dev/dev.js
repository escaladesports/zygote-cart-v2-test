import React from 'react'
import { render } from 'react-dom'
import {
  ZygoteContainer,
  ZygoteToggleButton,
  AddToCart,
  removeAllItems
} from '../src'
import zygote from '../src'
const brandLogo =
  'https://cdn.pixabay.com/photo/2018/05/21/22/44/logo-3419889_1280.png'

const containerEl = document.createElement('div')
const string = 'Hello World...'
const arr = string.split('')
document.body.appendChild(containerEl)
zygote.site('goalrilla')
render(
  <div>
    <div style={{ height: '30px' }}>
      {arr.map((letter, i) => (
        <div key={i} className={`test test${i}`}>
          {letter}
        </div>
      ))}
    </div>
    <button onClick={() => zygote.toggleCart()}>Toggle</button>

    <AddToCart
      price={12.33}
      desc="Hello there"
      id={`av88a30107r`}
      image={'https://pingpong.com/img/product/t1265-0-s.jpg?1496431075'}
      name={`table white`}
      url={'https://spin.stigaus.com/'}
      open
    >
      <button className="cartButton">Add to Cart</button>
    </AddToCart>
    <div
      style={{
        width: '200px',
        height: '200px',
        background: '#333',
        margin: '5px',
        display: 'inline-block'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: '#ccc',
        margin: '5px',
        display: 'inline-block'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: 'yellow',
        margin: '5px'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: 'orange',
        margin: '5px'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: '#333',
        margin: '5px',
        display: 'inline-block'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: '#333',
        margin: '5px',
        display: 'inline-block'
      }}
    />
    <div
      style={{
        width: '200px',
        height: '200px',
        background: '#333',
        margin: '5px',
        display: 'inline-block'
      }}
    />
    <ZygoteContainer
      googleApiKey={'AIzaSyD2pAEWs2VMApgeuoNhy3dJoPWDvMOm49Y'}
      ccPhone={'+1 (812)-999-8888'}
      // brandLogo={brandLogo}
      // addToCartMessage={'Custom Add To Cart MeSsAgE'}
      // cartHeader={'Here is your cart header'}
      // footerMessage={'Here is from me'}
      // cartButtonOneMessage={'Do da checkout'}
      // cartButtonTwoMessage={'Quit this checkout'}
      // contactInfoButtonMessage={'the next step'}
      // paymentButtonMessage={'give us money'}
      // orderCompleteMessage={'just bought from the best store ever'}
    />
    <style jsx>{`
      .test {
        display: inline-block;
        color: blue;
        animation: test 1s ease-in-out infinite alternate;
      }
      .test0 {
        animation-delay: 0;
      }
      .test1 {
        animation-delay: 0.25s;
      }
      .test2 {
        animation-delay: 0.5s;
      }
      .test3 {
        animation-delay: 0.75s;
      }
      .test4 {
        animation-delay: 1s;
      }
      .test5 {
        animation-delay: 1.25s;
      }
      .test6 {
        animation-delay: 1.5s;
      }
      .test7 {
        animation-delay: 1.75s;
      }
      .test8 {
        animation-delay: 2s;
      }
      .test9 {
        animation-delay: 2.25s;
      }
      .test10 {
        animation-delay: 2.5s;
      }
      .test11 {
        animation-delay: 2.75s;
      }
      .test12 {
        animation-delay: 3s;
      }
      .test13 {
        animation-delay: 3.25s;
      }
      @keyframes test {
        from {
          font-size: 1em;
        }
        to {
          font-size: 1.5em;
        }
      }
    `}</style>
  </div>,
  containerEl
)
