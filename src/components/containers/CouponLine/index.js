import React, { Component } from 'react'
import { Subscribe } from 'statable'

import { itemState } from '../../state'
import styles from './styles'
import AnimateHOC from '../../utils/AnimateHOC'

class CouponLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: ''
    }
  }

  componentDidMount() {
    if (this.props.animate) {
      setTimeout(() => {
        this.setState({ class: 'zygoteAnimMount' })
      }, 0)
    }
  }

  render() {
    return (
      <Subscribe to={itemState}>
        {state => (
          <div
            className={`zygoteCouponLine ${this.props.isMounted &&
              this.state.class} ${this.props.animate && 'zygoteAnimate'}`}
          >
            <div className="zygoteCouponHead">Coupon Code: {state.coupon}</div>
            <div className="zygoteCouponTotal">- ${state.couponValue}</div>
            <style jsx>{styles}</style>
          </div>
        )}
      </Subscribe>
    )
  }
}

export default AnimateHOC(CouponLine)
