import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { Subscribe } from 'statable'

import { cartState, itemState, cost, userInfo } from '../../state'
import { Nav } from '../../containers'
import { closeCart, resetCart } from '../../../injectState'
import { upperFirst } from '../../utils'
import styles from './styles.js'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.checkState = this.checkState.bind(this)
  }

  checkState() {
    closeCart()
    const { tab, loading, apiErrors, errors } = cartState.state
    cartState.setState({ tab: 0 })

    if (tab === 3 && loading === false) {
      if (errors || apiErrors) {
        cartState.setState({ tab: 0 })
        return
      }
      resetCart()
    }
  }

  render() {
    return (
      <Subscribe to={[cartState, itemState]}>
        {(state, itemObj) => (
          <div className="zygoteHeader">
            <div className="zygoteClose" onClick={() => this.checkState()}>
              ×
            </div>
            <div className="zygoteBrandLogo">
              {this.props.brandLogo ? (
                <img src={this.props.brandLogo} alt="" />
              ) : (
                <div className="zygoteDefaultBrandLogo">Brand Logo</div>
              )}
            </div>
            {itemObj.items.length === 0 ? null : state.tab === 1 ? (
              <Nav />
            ) : state.tab === 2 ? (
              <Nav />
            ) : state.tab === 3 ? (
              <div>
                <div className="zygoteOrderComplete">
                  <div className="zygoteOrderCompleteTitle">
                    {this.props.orderCompleteTitle}
                  </div>
                  <div className="zygoteOrderCompleteBody">
                    {this.props.orderCompleteBody ||
                      `Your ${upperFirst(state.site)} order is in!`}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="zygoteAddedToCart">
                  {this.props.addToCartMessage}
                </div>
                {this.props.cartHeader ? (
                  <div className="zygoteCartHeader">
                    {this.props.cartHeader}
                  </div>
                ) : null}
              </div>
            )}

            <style jsx>{styles}</style>
          </div>
        )}
      </Subscribe>
    )
  }
}

Header.defaultProps = {
  addToCartMessage: "You've added to your cart!",
  orderCompleteTitle: 'Yessss!'
}
