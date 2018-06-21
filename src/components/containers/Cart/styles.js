import css from 'styled-jsx/css'

export default css`
  .zygoteModal {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
    border-radius: 2px;
    background-color: #fff;
    width: 500px;
    right: 0;
    bottom: 0;
    position: absolute;
    top: 0;
    overflow-x: auto;
    overflow: auto;
    transform: translateX(100%);
    transition: transform 0.25s linear;
  }
  .zygoteModalAction {
    transform: translateX(0%);
  }

  @media (max-width: 500px) {
    .zygoteModal {
      width: 100vw;
    }
  }
`
