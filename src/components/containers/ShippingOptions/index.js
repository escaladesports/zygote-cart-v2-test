import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { Subscribe } from 'statable'
import { FoldingCube } from 'better-react-spinkit'

import styles from './styles'
import { cost, cartState, userInfo, itemState, zygoteApi } from '../../state'
import { removeCookies, resetCart } from '../../../injectState'

export default class ShippingOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingOption: {}
    }

    this.changeShipping = this.changeShipping.bind(this)
  }

  async changeShipping(shipOption) {
    const shipKey = Object.keys(shipOption)[0]
    if (userInfo.state.preOrderInfo.setShip[shipKey] === shipOption[shipKey]) {
      return
    }

    let updatedShipOption = {}
    Object.keys(shipOption).forEach(k => {
      updatedShipOption = userInfo.state.preOrderInfo.setShip
        ? { ...userInfo.state.preOrderInfo.setShip, [k]: shipOption[k] }
        : shipOption
    })

    userInfo.setState({
      preOrderInfo: {
        ...userInfo.state.preOrderInfo,
        setShip: updatedShipOption
      }
    })

    // Make request to change shipping option
    cartState.setState({
      loading: true
    })
    const { preOrderInfo } = userInfo.state
    const shippingRes = await fetch(zygoteApi.state.api, {
      body: JSON.stringify(preOrderInfo),
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
    if (shippingRes) {
      Object.keys(shippingRes.shippingOptions).forEach(k => {
        this.setState({
          shippingOption: {
            ...this.state.shippingOption,
            [k]: Number(shippingRes.shippingOptions[k].selected)
          }
        })
      })
      cost.setState({
        tax: shippingRes.tax,
        shipping: shippingRes.shipping,
        shippingOptions:
          Object.keys(shippingRes.shippingOptions).length > 0
            ? shippingRes.shippingOptions
            : null
      })
      cartState.setState({
        loading: false,
        apiErrors: shippingRes.errors.length > 0 ? shippingRes.errors : null
      })
      if (shippingRes.errors.length > 0) {
        shippingRes.errors.forEach(err => {
          if (err.includes('CRT-1-00013')) {
            itemState.setState({ coupon: '' })
          }
        })
      }
    }
  }

  async componentDidMount() {
    if (cartState.state.tab === 2) {
      const { shipping, preOrderInfo } = userInfo.state
      const { items } = itemState.state
      let updated = { ...shipping }

      const names = updated.shippingFullName.split(' ')
      updated.shippingFirst = names[0]
      updated.shippingLast = names[1]
      delete updated.shippingFullName
      if (preOrderInfo) {
        updated.cartId = preOrderInfo.cartId
        updated.site = preOrderInfo.site
      } else {
        updated.site = cartState.state.site
        updated.products = items
      }
      updated.addressSame = userInfo.state.addressSame
      cartState.setState({
        loading: true
      })
      console.log(updated)
      return
      const shippingRes = await fetch(zygoteApi.state.api, {
        body: JSON.stringify(updated),
        method: 'POST'
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err)
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
            error = `${err}` || err || err.response
          }
          cartState.setState({
            apiErrors: [error],
            loading: false
          })
        })
      console.log(shippingRes)
      return
      shippingRes.products.forEach(product => {
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
      })
      updated.shippingOptions = shippingRes.shippingOptions
      if (updated.shippingOptions) {
        Object.keys(updated.shippingOptions).forEach(k => {
          this.setState({
            shippingOption: { ...this.state.shippingOption, [k]: 0 }
          })
          updated.setShip = updated.setShip
            ? { ...updated.setShip, [k]: 0 }
            : { [k]: 0 }
        })
      }
      if (!updated.cartId) {
        updated.cartId = shippingRes.cartId
      }
      updated.locations = shippingRes.locations
      userInfo.setState({
        preOrderInfo: updated
      })
      cost.setState({
        tax: shippingRes.tax,
        shipping: shippingRes.shipping,
        shippingOptions: updated.shippingOptions
      })
      cartState.setState({
        loading: false,
        apiErrors: shippingRes.errors.length > 0 ? shippingRes.errors : null
      })
      if (shippingRes.errors.length > 0) {
        shippingRes.errors.forEach(err => {
          if (err.includes('CRT-1-00013')) {
            itemState.setState({ coupon: '' })
          }
        })
      }
    }
  }

  render() {
    return (
      <Subscribe to={[cartState, cost, itemState]}>
        {(cart, cost, itemState) => {
          if (cart.loading) {
            return (
              <div className="zygoteLoading">
                <div className="zygoteLoader">
                  <FoldingCube size={50} color="rgb(0, 207, 255)" />
                </div>
              </div>
            )
          }
          if (cart.apiErrors) {
            return (
              <div className="zygoteShippingErrors">
                <div className="zygoteErrorsTitle">
                  Please Contact Customer Support
                </div>
                <div className="zygoteErrorsContact">
                  (contact information for customer support)
                </div>
                <div className="zygoteMsgs">
                  {cart.apiErrors.map((error, i) => {
                    return (
                      <div key={i} className="zygoteErr">
                        {error}
                      </div>
                    )
                  })}
                </div>
                <style jsx>{styles}</style>
              </div>
            )
          }
          return (
            <div className="zygoteShippingOptionsContainer">
              <div className="zygoteShippingOptions">
                {cost.shippingOptions ? (
                  <div className="zygoteShipOptionLine">
                    {Object.keys(cost.shippingOptions).map((k, i) => {
                      const shipOptions = cost.shippingOptions[k]
                      const updatedProducts =
                        shipOptions.products.length === 0
                          ? []
                          : shipOptions.products.map(product => {
                              return itemState.items.find(
                                item =>
                                  item.id.toLowerCase() ===
                                  product.id.toLowerCase()
                              )
                            })
                      return (
                        <div className="zygoteShippingInputs" key={i}>
                          <div className="zygoteSectionTitle">
                            4.{' '}
                            {shipOptions.type.charAt(0).toUpperCase() +
                              shipOptions.type.slice(1)}{' '}
                            Shipping Options
                          </div>
                          {updatedProducts.length > 0 ? (
                            <div className="zygoteShippingProducts">
                              {updatedProducts.map((product, i) => (
                                <div key={i}>
                                  for{' '}
                                  {shipOptions.type === 'freight'
                                    ? 'large'
                                    : 'small'}{' '}
                                  {product.name} from{' '}
                                  {k.charAt(0).toUpperCase() + k.slice(1)}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {shipOptions.options.map((shipOption, i) => {
                            return (
                              <div className="zygoteShippingSection" key={i}>
                                <div className="zygoteCheckboxContainer">
                                  <label>
                                    <div className="zygoteShippingName">
                                      {shipOption.carrier
                                        ? shipOption.carrier.serviceType
                                        : null}{' '}
                                      {shipOption.name}
                                    </div>
                                    <div className="zygoteShippingPrice">
                                      ${shipOption.amount}
                                    </div>
                                    <input
                                      type="radio"
                                      value={i}
                                      className="zygoteShippingInput"
                                      onChange={() =>
                                        this.setState({
                                          shippingOption: {
                                            ...this.state.shippingOption,
                                            [k]: i
                                          }
                                        })
                                      }
                                      onClick={() =>
                                        this.changeShipping({ [k]: i })
                                      }
                                      checked={
                                        this.state.shippingOption[k] === i
                                          ? true
                                          : false
                                      }
                                    />
                                    <span className="zygoteCheckbox" />
                                  </label>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="zygoteNoShip">No Shipping Options</div>
                )}
              </div>
              <style jsx>{styles}</style>
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
