import React, { Component } from 'react'
import { Subscribe } from 'statable'

import { cost } from '../../state'
import styles from './styles'

export default class Total extends Component {
  componentDidMount() {
    const { total, subtotal, tax, shipping, coupon } = cost.state

    const sum = parseFloat((subtotal + tax + shipping - coupon).toFixed(2))
    if (total !== sum) {
      cost.setState({
        total: sum
      })
    }
    cost.subscribe(state => {
      const updatedSum = parseFloat(
        (state.subtotal + state.tax + state.shipping - state.coupon).toFixed(2)
      )
      if (state.total !== updatedSum) {
        cost.setState({
          total: updatedSum
        })
      }
    })
  }

  componentWillUnmount() {
    cost.unsubscribe()
  }

  render() {
    return (
      <Subscribe to={cost}>
        {state => (
          <div className="zygoteTotalLine">
            <div className="zygoteTotalHead">Total</div>
            <div className="zygoteTotal">
              ${state.total.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }
              )}
            </div>
            <style jsx global>
              {styles}
            </style>
          </div>
        )}
      </Subscribe>
    )
  }
}
