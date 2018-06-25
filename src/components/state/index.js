import { State } from 'statable'
import Cookie from 'js-cookie'

const cartState = new State({
  open: true,
  tab: 0,
  errors: null,
  apiErrors: null,
  loading: false,
  site: '',
  mounted: false,
  animate: false
})

const cost = new State({
  tax: 0,
  shipping: 0,
  total: 0,
  subtotal: 0,
  coupon: 0,
  shippingOptions: null
})

const itemState = new State(
  Cookie.get('item')
    ? JSON.parse(Cookie.get('item'))
    : {
        items: [
          {
            desc: 'Table tennis paddle.',
            id: 'B1002',
            image: 'https://pingpong.com/img/product/t1265-0-s.jpg?1496431075',
            name: 'Item One',
            price: 21.99,
            qty: 1,
            url: 'https://pingpong.comproduct/t1265'
          }
        ],
        coupon: '',
        couponErr: null,
        couponValue: 0
      }
)

itemState.subscribe(() => {
  Cookie.set('item', itemState.state, { expires: 5 })
})

const zygoteApi = new State({
  api: 'https://71zp2pscp3.execute-api.us-east-1.amazonaws.com/development/'
})

const userInfo = new State(
  Cookie.get('userInfo')
    ? JSON.parse(Cookie.get('userInfo'))
    : {
        addressSame: true,
        specialOffers: true,
        preOrderInfo: null,
        shipping: {
          shippingFullName: '',
          shippingEmail: '',
          shippingPhone: '',
          shippingApt: '',
          shippingCompanyName: '',
          shippingAddress: '',
          shippingCity: '',
          shippingState: '',
          shippingZip: ''
        },
        payment: {
          billingNumber: '',
          billingSecurity: '',
          billingExpiration: ''
        },
        paymentAddress: {
          billingAddress: '',
          billingCity: '',
          billingState: '',
          billingZip: '',
          billingApt: '',
          billingCompanyName: ''
        }
      }
)

userInfo.subscribe(() => {
  Cookie.set('userInfo', userInfo.state, { expires: 5 })
})

export { cartState, userInfo, itemState, zygoteApi, cost }
