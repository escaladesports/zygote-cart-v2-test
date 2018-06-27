import React, { Component } from 'react'
import { Subscribe } from 'statable'
import { FoldingCube } from 'better-react-spinkit'

import { itemState, cartState, userInfo, zygoteApi, cost } from '../../state'
import styles from './styles'
import { arrsAreEqual } from '../../utils/compare'

export default class Coupon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: false,
      coupon: null,
      items: []
    }
    this.handleCoupon = this.handleCoupon.bind(this)
    this.handleRemoveCoupon = this.handleRemoveCoupon.bind(this)
    this.checkItems = this.checkItems.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async handleCoupon() {
    const { preOrderInfo } = userInfo.state
    if (this.state.coupon || itemState.state.coupon) {
      let updated = {}
      if (preOrderInfo) {
        updated.cartId = preOrderInfo.cartId
      } else {
        updated.products = itemState.state.items
      }
      updated.site = cartState.state.site
      updated.addCoupon = this.state.coupon || itemState.state.coupon
      console.log(updated)

      this.setState({ loading: true })
      const couponRes = await fetch(zygoteApi.state.api, {
        body: JSON.stringify(updated),
        method: 'POST'
      })
        .then(res => res.json())
        .catch(err => {
          itemState.setState({
            couponErr: `${err}`
          })
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
            error = JSON.stringify(err) || err || err.response
          }
          cartState.setState({
            apiErrors: [error],
            loading: false
          })
        })

      if (!couponRes) {
        itemState.setState({
          couponErr: 'Could not get response from server for Coupon'
        })
        return
      }
      if (couponRes) {
        if (preOrderInfo) {
          userInfo.setState({
            preOrderInfo: {
              ...userInfo.state.preOrderInfo,
              cartId: couponRes.cartId
            }
          })
        }
        if (couponRes.products) {
          const { items, coupon } = itemState.state

          couponRes.products.forEach(product => {
            const regexp = new RegExp(product.id, 'gi')
            const updatedItem = items.find(({ id }) => regexp.test(id))

            if (!updatedItem) {
              console.warn('Item not found and being removed from the array')
              const index = itemState.state.items.indexOf(updatedItem)
              const updated = [...itemState.state.items]
              updated.splice(index, 1)
              itemState.setState({
                items: updated
              })
              return
            }
            updatedItem.price = product.price
            itemState.setState({
              items: itemState.state.items.map(
                item => (item.id === product.id ? updatedItem : item)
              )
            })
            if (preOrderInfo) {
              if (!preOrderInfo.products) {
                userInfo.setState({
                  preOrderInfo: {
                    ...userInfo.state.preOrderInfo,
                    products: itemState.state.items.map(
                      item => (item.id === product.id ? updatedItem : item)
                    )
                  }
                })
              }
            }
          })
        }
        if (couponRes.errors.length > 0) {
          itemState.setState({ coupon: '', couponErr: couponRes.errors[0] })
          this.setState({ loading: false })
        } else if (couponRes.errors.length === 0) {
          if (couponRes.coupons) {
            const coupon =
              couponRes.coupons[
                (this.state.coupon || itemState.state.coupon).toUpperCase()
              ].discount_amount.value
            const rawValue = parseFloat(coupon.replace(/\$|-/g, ''))
            itemState.setState({
              couponErr: null,
              couponValue: rawValue
            })
            if (!itemState.state.coupon) {
              itemState.setState({
                coupon: this.state.coupon
              })
            }
            cost.setState({ coupon: rawValue })
            if (itemState.state.couponValue && !itemState.state.couponErr) {
              this.setState({ loading: false, show: false })
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
      }
    }
  }

  async handleRemoveCoupon() {
    const { preOrderInfo } = userInfo.state
    let updated = {}
    if (preOrderInfo) {
      updated.cartId = preOrderInfo.cartId
    }
    updated.site = cartState.state.site
    updated.addCoupon = itemState.state.coupon
    updated.products = itemState.state.items
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
          error = JSON.stringify(err) || err || err.response
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
        userInfo.setState({ preOrderInfo: null })
        this.setState({ loading: false })
      }
    } else {
      itemState.setState({
        couponErr: 'Could not get response from server for Coupon'
      })
    }
  }

  checkItems(state) {
    const newQtys = state.items.map(item => item.qty)
    const same = arrsAreEqual(newQtys, this.state.items)
    if (!same) {
      this.handleCoupon()
      this.setState({ items: newQtys })
    }
  }

  componentDidMount() {
    const { coupon } = itemState.state
    if (coupon) {
      this.handleCoupon()
    }
    itemState.setState({ couponErr: null })
    // itemState.subscribe(this.checkItems)
  }

  componentWillUnmount() {
    console.log('Will unmount')
    // itemState.unsubscribe(this.checkItems)
  }

  onChange(e) {
    this.setState({ coupon: e.target.value })
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
                    onChange={this.onChange}
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
