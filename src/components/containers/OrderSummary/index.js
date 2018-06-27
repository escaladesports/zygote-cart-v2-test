import React, { Component } from 'react'
import { Subscribe } from 'statable'

import styles from './styles'
import { itemState } from '../../state'
import {
  Item,
  Subtotal,
  ShippingCost,
  Tax,
  Total,
  CouponLine
} from '../../containers'
import AnimateHOC from '../../utils/AnimateHOC'

class OrderSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: '',
      animate: false
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(state) {
    if (!state.coupon) {
      if (this.props.animateCoupon) {
        this.setState({ animate: true })
      }
    }
  }

  componentDidMount() {
    // For initial load of animation
    if (!itemState.state.coupon) {
      if (this.props.animateCoupon) {
        this.setState({ animate: true })
      }
    }
    // For checking when coupon is toggled
    itemState.subscribe(this.onChange)
    if (this.props.animate) {
      setTimeout(() => {
        this.setState({ class: 'zygoteAnimMount' })
      }, 0)
    }
  }

  componentWillUnmount() {
    itemState.unsubscribe(this.onChange)
  }

  render() {
    return (
      <Subscribe to={itemState}>
        {state => (
          <div className={`zygoteOrderSummaryContainer zygoteCouponLine`}>
            <Item />
            <div className="zygoteSubFieldsContainer">
              <div className="zygoteSubFields">
                <Subtotal />
                <CouponLine
                  isMounted={state.coupon ? true : false}
                  delayTime={250}
                  animate={this.state.animate}
                />
                <ShippingCost />
                <Tax />
              </div>
            </div>
            <Total />
            <style jsx>{styles}</style>
          </div>
        )}
      </Subscribe>
    )
  }
}
export default OrderSummary
