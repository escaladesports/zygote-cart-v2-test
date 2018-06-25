import React, { Component } from 'react'
import { Subscribe } from 'statable'
import FaEdit from 'react-icons/lib/fa/edit'
import { FoldingCube } from 'better-react-spinkit'

import { itemState, cartState, userInfo, zygoteApi, cost } from '../../state'
import styles from './styles'

export default class Coupon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: false,
      items: itemState.state.items
    }
    this.handleCoupon = this.handleCoupon.bind(this)
    this.handleRemoveCoupon = this.handleRemoveCoupon.bind(this)
    this.checkItems = this.checkItems.bind(this)
    this.checkUser = this.checkUser.bind(this)
  }

  async handleCoupon() {
    if (!itemState.state.coupon && this.coupon) {
      itemState.setState({ coupon: this.coupon.value })
    }

    const { preOrderInfo } = userInfo.state
    if (itemState.state.coupon) {
      let updated = {}
      if (preOrderInfo) {
        updated.site = preOrderInfo.site
        updated.cartId = preOrderInfo.cartId
      }
      updated.addCoupon = itemState.state.coupon
      this.setState({ loading: true })
      const couponRes = await fetch(zygoteApi.state.api, {
        body: JSON.stringify(updated),
        method: 'POST'
      })
        .then(res => res.json())
        .catch(err => {
          let error = ''
          if (
            err.request &&
            (err.request.status === 404 || err.request.status === 502)
          ) {
            error = `Error with API: ${err.response.statusText}`
          } else if (err.request && err.request.status === 0 && !err.response) {
            error =
              'Something went wrong with the request, no response was given.'
          } else {
            error = err.response || JSON.stringify(err) || err
          }
          cartState.setState({
            apiErrors: [error],
            loading: false
          })
        })
      if (couponRes) {
        if (couponRes.errors.length > 0) {
          itemState.setState({ coupon: '', couponErr: couponRes.errors[0] })
        } else if (couponRes.errors.length === 0) {
          if (couponRes.coupons) {
            const coupon =
              couponRes.coupons[itemState.state.coupon.toUpperCase()]
                .discount_amount.value
            const rawValue = parseFloat(coupon.replace(/\$|-/g, ''))
            this.setState({ show: false })
            itemState.setState({
              couponErr: null,
              couponValue: rawValue
            })
            cost.setState({ coupon: rawValue })
            if (itemState.state.couponValue && !itemState.state.couponErr) {
              this.setState({ loading: false })
            }
          } else {
            itemState.setState({
              coupon: '',
              couponErr:
                'That coupon does not exist with the current information given'
            })
            this.setState({ loading: false })
          }
        }
      } else {
        itemState.setState({
          couponErr: 'Could not get response from server for Coupon'
        })
      }
    }
  }

  async handleRemoveCoupon() {
    const { preOrderInfo } = userInfo.state
    if (preOrderInfo) {
      let updated = {}
      updated.site = preOrderInfo.site
      updated.cartId = preOrderInfo.cartId
      updated.removeCoupon = itemState.state.coupon
      this.setState({ loading: true })

      const couponRes = await fetch(zygoteApi.state.api, {
        body: JSON.stringify(updated),
        method: 'POST'
      })
        .then(res => res.json())
        .catch(err => {
          let error = ''
          if (
            err.request &&
            (err.request.status === 404 || err.request.status === 502)
          ) {
            error = `Error with API: ${err.response.statusText}`
          } else if (err.request && err.request.status === 0 && !err.response) {
            error =
              'Something went wrong with the request, no response was given.'
          } else {
            error = err.response || JSON.stringify(err) || err
          }
          cartState.setState({
            apiErrors: [error],
            loading: false
          })
        })
      if (couponRes) {
        if (couponRes.errors.length > 0) {
          itemState.setState({ coupon: '', couponErr: couponRes.errors[0] })
        } else if (couponRes.errors.length === 0) {
          this.setState({ show: false })
          itemState.setState({
            couponErr: null,
            couponValue: 0,
            coupon: ''
          })
          cost.setState({ coupon: 0 })
        }
        this.setState({ loading: false })
      } else {
        itemState.setState({
          couponErr: 'Could not get response from server for Coupon'
        })
      }
    }
  }

  checkItems(state) {
    if (state.items !== this.state.items) {
      this.handleCoupon()
      this.setState({ items: state.items })
    }
  }

  checkUser(state) {
    if (state.preOrderInfo) {
      this.handleCoupon()
    }
  }

  componentDidMount() {
    const { coupon } = itemState.state
    if (coupon) {
      this.handleCoupon()
    }
    itemState.setState({ couponErr: null })
    itemState.subscribe(this.checkItems)
    userInfo.subscribe(this.checkUser)
  }

  componentWillUnmount() {
    itemState.unsubscribe(this.checkItems)
    userInfo.unsubscribe(this.checkUser)
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="zygoteLoading">
          <div className="zygoteLoader">
            <FoldingCube size={50} color="rgb(0, 207, 255)" />
          </div>
        </div>
      )
    }
    return (
      <Subscribe to={itemState}>
        {state => (
          <div className={`zygoteCouponLine`}>
            {state.couponErr ? (
              <div className="zygoteCouponErr">{state.couponErr}</div>
            ) : null}

            {this.state.show ? (
              <div className="zygoteCouponCode">
                <form action="#">
                  <input
                    type="text"
                    ref={input => (this.coupon = input)}
                    name="zygoteCouponCode"
                    placeholder={'Enter Coupon Code...'}
                  />
                  <button
                    onClick={() => this.handleCoupon()}
                    className="zygoteCouponButton"
                  >
                    Apply
                  </button>
                </form>
              </div>
            ) : (
              <div>
                {state.coupon ? null : (
                  <div
                    className="zygoteEscaAdd"
                    onClick={() => this.setState({ show: true })}
                  >
                    +
                  </div>
                )}

                {state.coupon ? (
                  <div style={{ display: 'inline-block' }}>
                    <div
                      className="zygoteCouponHighlight"
                      style={{ display: 'inline-block' }}
                    >
                      {state.coupon}
                    </div>
                    <div style={{ display: 'inline-block' }}>
                      {' '}
                      : Coupon Applied!
                    </div>
                    <span
                      className="zygoteRemoveCoupon"
                      onClick={() => {
                        this.handleRemoveCoupon()
                      }}
                    >
                      ×
                    </span>
                  </div>
                ) : (
                  <span onClick={() => this.setState({ show: true })}>
                    Apply a Coupon
                  </span>
                )}
              </div>
            )}

            <style jsx global>
              {styles}
            </style>
          </div>
        )}
      </Subscribe>
    )
  }
}
