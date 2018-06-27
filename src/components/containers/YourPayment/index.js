import React, { Component } from 'react'
import { Subscribe } from 'statable'
import validator from 'validator'
import cardValid from 'card-validator'
import {
  Icon_Visa,
  Icon_MasterCard,
  Icon_AmericanExpress,
  Icon_Discover
} from 'material-ui-credit-card-icons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FaCreditCardAlt from 'react-icons/lib/fa/credit-card-alt'
import MaskedInput from 'react-maskedinput'
import { AutoComplete } from 'react-store-locator'
import { yourPayment } from '../../utils'
import { userInfo, cartState, cost } from '../../state'
import {
  ShippingOptions,
  Coupon,
  OrderSummary,
  PaymentLine
} from '../../containers'
import styles from './styles'
import { BillingAddress } from '../../views'

const inLineStyles = {
  cardIcon: {
    height: '30px',
    width: '30px',
    transform: 'translateY(-15%)'
  }
}

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: true,
      inputErrors: {},
      cardType: null
    }
    this.renderField = this.renderField.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.update = this.update.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.addressSearch = this.addressSearch.bind(this)
    this.validate = this.validate.bind(this)
    this.validateCC = this.validateCC.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    let { errors } = cartState.state
    const { paymentAddress } = userInfo.state
    if (this.state.checked) {
      Object.keys(paymentAddress).forEach(k => {
        if (errors) {
          if (errors[k]) {
            delete errors[k]
          }
        }
      })
    }
    if (typeof errors === 'object') {
      if (errors && Object.keys(errors).length === 0) {
        cartState.setState({ errors: null })
      }
      if (this.state.inputErrors === errors) {
        return
      }
      this.setState({
        inputErrors: errors
      })
    }
  }

  addressSearch(place) {
    if (typeof place === 'object') {
      userInfo.setState({
        paymentAddress: {
          ...userInfo.state.paymentAddress,
          billingAddress: place.address || '',
          billingZip: place.zip || '',
          billingCity: place.city || '',
          billingState: place.state || ''
        }
      })
    }
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked })
    userInfo.setState({ addressSame: !this.state.checked })
  }

  onKeyPress(e) {
    if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
      e.preventDefault()
    }
  }

  update(e) {
    e.preventDefault()
    const name = `billing${e.target.name.replace(/\s/g, '')}`
    userInfo.setState({
      payment: {
        ...userInfo.state.payment,
        [name]: e.target.value.replace(/_|\s+/g, '')
      }
    })
  }

  updateAddress(e) {
    e.preventDefault()
    const name = `billing${e.target.name.replace(/\s/g, '')}`
    userInfo.setState({
      paymentAddress: {
        ...userInfo.state.paymentAddress,
        [name]: e.target.value
      }
    })
  }

  validate(e) {
    const { value } = e.target
    const { inputErrors } = this.state
    let updatedErrs = { ...inputErrors }
    const name = `billing${e.target.name.replace(/\s/g, '')}`
    let formattedCard = null

    if (value.length === 0) {
      updatedErrs[name] = name => `Please enter a valid ${name}`
    } else if (value.length > 0) {
      delete updatedErrs[name]
    }
    if (value.length === 0 && e.target.name !== 'Number') {
      updatedErrs[name] = name => `Please enter a valid ${name}`
    } else if (value.length > 0) {
      delete updatedErrs[name]
    }
    if (e.target.name === 'Number') {
      formattedCard = value.replace(/_|\s+/g, '')
    }
    if (e.target.name === 'Number') {
      const numberValidation = cardValid.number(formattedCard)
      if (
        !numberValidation.isPotentiallyValid ||
        !numberValidation.card ||
        formattedCard.length === 0
      ) {
        this.setState({ cardType: null })
      }
      if (numberValidation.isPotentiallyValid && numberValidation.card) {
        this.setState({ cardType: numberValidation.card.type })
      }
    }
    if (
      e.target.name === 'Expiration' &&
      !cardValid.expirationDate(value).isValid
    ) {
      updatedErrs[name] = name => `Please enter a valid ${name}`
    } else if (
      e.target.name === 'Expiration' &&
      !cardValid.expirationDate(value).isValid
    ) {
      delete updatedErrs[name]
    }
    if (e.target.name === 'Zip' && !validator.isPostalCode(value, 'any')) {
      updatedErrs[name] = name => `Please enter a valid ${name}.`
    } else if (
      e.target.name === 'Zip' &&
      validator.isPostalCode(value, 'any')
    ) {
      delete updatedErrs[name]
    }
    if (Object.keys(updatedErrs).length > 0) {
      cartState.setState({ errors: true })
    } else {
      cartState.setState({ errors: null })
    }

    this.setState({ inputErrors: updatedErrs })
  }

  validateCC(e) {
    const { value } = e.target
    const name = `billing${e.target.name.replace(/\s/g, '')}`
    const { inputErrors } = this.state
    let updatedErrs = { ...inputErrors }
    let formattedCard = null
    if (value.length === 0) {
      updatedErrs[name] = name => `Please enter a valid ${name}`
    } else if (value.length > 0) {
      delete updatedErrs[name]
    }
    if (
      e.target.name === 'Security' &&
      !cardValid.cvv(value, this.state.cardType === 'american-express' ? 4 : 3)
        .isValid
    ) {
      updatedErrs[name] = name => `Please enter a valid ${name}`
    } else if (
      e.target.name === 'Security' &&
      cardValid.cvv(value, this.state.cardType === 'american-express' ? 4 : 3)
        .isValid
    ) {
      delete updatedErrs[name]
    }
    if (e.target.name === 'Number') {
      formattedCard = value.replace(/_|\s+/g, '')
    }
    if (formattedCard) {
      if (
        e.target.name === 'Number' &&
        !cardValid.number(formattedCard).isValid
      ) {
        updatedErrs[name] = name => `Please enter a valid ${name}`
      } else if (
        e.target.name === 'Number' &&
        cardValid.number(formattedCard).isValid
      ) {
        this.setState({ cardType: cardValid.number(formattedCard).card.type })
        delete updatedErrs[name]
      }
    }
    if (Object.keys(updatedErrs).length > 0) {
      cartState.setState({ errors: true })
    } else {
      cartState.setState({ errors: null })
    }
    this.setState({ inputErrors: updatedErrs })
  }

  renderField(func, field, i, user) {
    const { inputErrors } = this.state
    const type = func === 'update' ? 'payment' : 'paymentAddress'
    const inputValue = user[type][field.formattedName]

    switch (field.type) {
      case 'checkbox':
        return (
          <div
            key={i}
            className="zygoteCheckboxContainer"
            onClick={this.handleCheck}
          >
            <label htmlFor={field.class}>
              {`${field.label}`}
              <input
                type="checkbox"
                name={field.name}
                className={field.class}
                checked={this.state.checked}
                // onChange added to use checked in react
                onChange={() => {}}
              />
              <span
                className="zygoteCheckbox"
                onClick={() =>
                  this.setState({
                    checked: !this.state.checked
                  })
                }
              />
            </label>
            <style jsx>{styles}</style>
          </div>
        )
      case 'toggle':
        return (
          <div
            key={i}
            className={`${
              inputErrors
                ? inputErrors[field.formattedName]
                  ? 'zygoteInputErr'
                  : ''
                : ''
            } ${
              field.class
            }Container zygoteToggleFieldWrapper zygoteInputWrapper`}
          >
            {this.state[`toggle${field.name}`] ? (
              <label
                aria-required="false"
                htmlFor={field.name}
                className={`zygoteInputLabel ${
                  this.state[field.name] || inputValue ? 'zygoteAnimLabel' : ''
                }`}
              >
                {field.label} {field.span ? field.span : null}
              </label>
            ) : null}
            {this.state[`toggle${field.name}`] ? (
              <div>
                <input
                  type="text"
                  className={field.class}
                  name={field.name}
                  value={inputValue}
                  onChange={this[func]}
                  id={field.name}
                  onFocus={() => this.setState({ [field.name]: true })}
                  onBlur={() => this.setState({ [field.name]: false })}
                  placeholder={`${field.label} ${field.span ? field.span : ''}`}
                  autoFocus
                />
                {inputErrors ? (
                  inputErrors[field.formattedName] ? (
                    <div className="zygoteInputMsg">
                      {inputErrors[field.formattedName](field.name)}
                    </div>
                  ) : null
                ) : null}
              </div>
            ) : (
              <div
                className="zygoteToggleFieldContainer"
                onClick={() =>
                  this.setState({
                    [`toggle${field.name}`]: !this.state[`toggle${field.name}`]
                  })
                }
              >
                <div className="zygoteEscaAdd">+</div>
                <div className={`zygoteToggleField`}>{field.toggleLabel}</div>
                <style jsx>{styles}</style>
              </div>
            )}
          </div>
        )
      case 'select':
        return (
          <div
            key={i}
            className={`${
              inputErrors
                ? inputErrors[field.formattedName]
                  ? 'zygoteInputErr'
                  : ''
                : ''
            } ${field.class}Container zygoteSelect zygoteInputWrapper`}
          >
            <label
              aria-required="false"
              htmlFor={field.name}
              className={`zygoteInputLabel ${
                this.state[field.name] || inputValue ? 'zygoteAnimLabel' : ''
              }`}
            >
              {field.label} {field.span ? field.span : null}
            </label>
            <select
              type="text"
              className={field.class}
              id={field.class}
              onFocus={() => this.setState({ [field.name]: true })}
              onBlur={() => this.setState({ [field.name]: false })}
              name={field.name}
              value={inputValue}
              onChange={this[func]}
            >
              <option value="" disabled />
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {inputErrors ? (
              inputErrors[field.formattedName] ? (
                <div className="zygoteInputMsg">
                  {inputErrors[field.formattedName](field.name)}
                </div>
              ) : null
            ) : null}
            <style jsx>{styles}</style>
          </div>
        )
      default:
        return (
          <div
            key={i}
            className={`${
              inputErrors
                ? inputErrors[field.formattedName]
                  ? 'zygoteInputErr'
                  : ''
                : ''
            } ${field.class}Container`}
          >
            {field.name === 'Expiration' ? (
              <div className="zygoteInputWrapper">
                <label
                  aria-required="false"
                  htmlFor={field.name}
                  className={`zygoteInputLabel ${
                    this.state[field.name] || inputValue
                      ? 'zygoteAnimLabel'
                      : ''
                  }`}
                >
                  {field.label} {field.span ? field.span : null}
                </label>
                <MaskedInput
                  mask="11/11"
                  type={field.type}
                  inputMode="numeric"
                  className={field.class}
                  name={field.name}
                  ref={ref => (this[field.name] = ref)}
                  onChange={this[func]}
                  id={field.name}
                  onFocus={e => {
                    e.target.placeholder = '__/__'
                    this.setState({ [field.name]: true })
                  }}
                  onBlur={e => {
                    e.target.placeholder = 'MM/YY'
                    this.validate(e)
                    this.setState({ [field.name]: false })
                  }}
                  value={inputValue}
                  placeholder={`${field.label} ${field.span ? field.span : ''}`}
                />
              </div>
            ) : field.name === 'Number' ? (
              <div className="zygoteInputWrapper">
                <label
                  aria-required="false"
                  htmlFor={field.name}
                  className={`zygoteInputLabel ${
                    this.state[field.name] || inputValue
                      ? 'zygoteAnimLabel'
                      : ''
                  }`}
                >
                  {field.label} {field.span ? field.span : null}
                </label>
                <MaskedInput
                  mask={
                    this.state.cardType === 'american-express'
                      ? '1111 111111 11111'
                      : '1111 1111 1111 1111'
                  }
                  placeholderChar=" "
                  type={field.type}
                  inputMode="numeric"
                  className={field.class}
                  name={field.name}
                  ref={ref => (this[field.name] = ref)}
                  onChange={this[func]}
                  id={field.name}
                  onFocus={e => {
                    e.target.placeholder = ''
                    this.setState({ [field.name]: true })
                  }}
                  onBlur={e => {
                    e.target.placeholder = 'Card Number'
                    this.validateCC(e)
                    this.validate(e)
                    this.setState({ [field.name]: false })
                  }}
                  value={inputValue}
                  placeholder={`${field.label} ${field.span ? field.span : ''}`}
                />
              </div>
            ) : field.name === 'Address' ? (
              <div className="zygoteInputWrapper">
                <label
                  aria-required="false"
                  htmlFor={field.name}
                  className={`zygoteInputLabel ${
                    this.state[field.name] || inputValue
                      ? 'zygoteAnimLabel'
                      : ''
                  }`}
                >
                  {field.label} {field.span ? field.span : null}
                </label>
                <AutoComplete
                  type={field.type}
                  onChange={this[func]}
                  googleApiKey={this.props.googleApiKey || null}
                  getValue={this.addressSearch}
                  name={field.name}
                  id={field.name}
                  onBlur={e => {
                    this.validate(e)
                    if (!inputValue) {
                      this.setState({ [field.name]: false })
                    }
                  }}
                  onFocus={() => this.setState({ [field.name]: true })}
                  value={inputValue}
                  onKeyPress={field.name === 'Zip' ? this.onKeyPress : null}
                  placeholder={`${field.label} ${field.span ? field.span : ''}`}
                />
              </div>
            ) : (
              <div className="zygoteInputWrapper">
                <label
                  aria-required="false"
                  htmlFor={field.name}
                  className={`zygoteInputLabel ${
                    this.state[field.name] || inputValue
                      ? 'zygoteAnimLabel'
                      : ''
                  }`}
                >
                  {field.label} {field.span ? field.span : null}
                </label>
                <input
                  type={field.type}
                  onKeyDown={field.type === 'number' ? this.onKeyPress : null}
                  className={field.class}
                  id={field.name}
                  name={field.name}
                  ref={ref => (this[field.name] = ref)}
                  onChange={this[func]}
                  onBlur={e => {
                    this.validate(e)
                    if (!inputValue) {
                      this.setState({ [field.name]: false })
                    }
                    if (field.name === 'Security') {
                      this.validateCC(e)
                    }
                  }}
                  onFocus={() => this.setState({ [field.name]: true })}
                  value={inputValue}
                  placeholder={`${field.label} ${field.span ? field.span : ''}`}
                />
              </div>
            )}

            {field.name === 'Number' ? (
              <div className="zygoteCardPreview">
                <MuiThemeProvider>
                  {this.renderCard(this.state.cardType)}
                </MuiThemeProvider>
              </div>
            ) : null}

            {inputErrors ? (
              inputErrors[field.formattedName] ? (
                <div className="zygoteInputMsg">
                  {inputErrors[field.formattedName](field.name)}
                </div>
              ) : null
            ) : null}
            <style jsx>{styles}</style>
          </div>
        )
    }
  }

  renderCard(type) {
    if (!type) {
      const numberValidation = cardValid.number(
        userInfo.state.payment.billingNumber
      )
      if (numberValidation.isPotentiallyValid && numberValidation.card) {
        type = numberValidation.card.type
      }
    }

    switch (type) {
      case 'visa':
        return (
          <div className="zygotePaymentIcon">
            <Icon_Visa style={inLineStyles.cardIcon} />
          </div>
        )
      case 'mastercard':
        return (
          <div className="zygotePaymentIcon">
            <Icon_MasterCard style={inLineStyles.cardIcon} />
          </div>
        )
      case 'american-express':
        return (
          <div className="zygotePaymentIcon">
            <Icon_AmericanExpress style={inLineStyles.cardIcon} />
          </div>
        )
      case 'discover':
        return (
          <div className="zygotePaymentIcon">
            <Icon_Discover style={inLineStyles.cardIcon} />
          </div>
        )
      default:
        return (
          <div>
            <FaCreditCardAlt style={inLineStyles.cardIcon} color="#cccccc" />
          </div>
        )
    }
  }

  componentDidMount() {
    const { billingNumber } = userInfo.state.payment
    if (billingNumber) {
      const cardNum = cardValid.number(billingNumber)
      if (cardNum.isValid && cardNum.card.type) {
        this.setState({ cardType: cardNum.card.type })
      }
    }
    userInfo.setState({
      addressSame: true
    })
  }

  render() {
    return (
      <Subscribe to={[userInfo, cartState, cost]}>
        {(state, cart, cost) => (
          <div className="zygoteStep3 zygoteStep">
            <div className="zygoteTable">
              {cart.apiErrors ? null : (
                <div>
                  <div className="zygoteRow">
                    <form action="" className="zygoteForm">
                      {yourPayment.sections.map((section, i) => {
                        return (
                          <div className="zygoteSection" key={i}>
                            <div className="zygoteSectionTitle">
                              <span>{section.title}</span>
                              {section.title === '3. Payment' ? (
                                <div className="zygotePaymentLineWrapper">
                                  <PaymentLine />
                                </div>
                              ) : null}
                            </div>
                            {section.fields.map((field, i) => {
                              return this.renderField('update', field, i, state)
                            })}
                          </div>
                        )
                      })}
                    </form>
                    {!this.state.checked &&
                    state.shipping.shippingAddress.length > 0 ? (
                      <div className="zygotePreviewAddress">
                        <div>{state.shipping.shippingFullName}</div>
                        <div>{state.shipping.shippingAddress}</div>
                        <div>
                          {state.shipping.shippingCity},{' '}
                          {state.shipping.shippingState}{' '}
                          {state.shipping.shippingZip}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="overflowWrapper">
                    <div
                      className={`zygoteBillingInfo ${
                        this.state.checked ? '' : 'zygoteAnim'
                      }`}
                    >
                      <BillingAddress
                        renderField={this.renderField}
                        user={state}
                        yourPayment={yourPayment}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={`zygoteRow `}>
                <ShippingOptions />

                {cart.apiErrors ? null : (
                  <div>
                    <div className="zygoteRow">
                      <Coupon />
                    </div>
                    <div className="zygoteRow">
                      <div className="zygoteFinalOrderTitle">
                        Final Order Summary
                      </div>
                      <OrderSummary animateCoupon={true} isMounted={true} />
                      {state.shipping.shippingAddress.length > 0 ? (
                        <div className="zygotePreviewAddressBottom">
                          <h3>Shipping Address:</h3>
                          <div>{state.shipping.shippingFullName}</div>
                          <div>{state.shipping.shippingAddress}</div>
                          <div>
                            {state.shipping.shippingCity},{' '}
                            {state.shipping.shippingState}{' '}
                            {state.shipping.shippingZip}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
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
