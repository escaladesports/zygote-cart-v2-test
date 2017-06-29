# Zygote Cart/API

An client side ecommerce cart & checkout system. The cart/checkout forms are injected into the page via JavaScript. No other dependencies are needed other than the JavaScript file, but the CSS file is recommended.

## Usage

Insert the CSS file before your closing `</head>` tag:
```html
<link type="text/css" rel="stylesheet" href="https://zygote.netlify.com/zygote-v1.css">
```

Insert the JavaScript file before your closing `</body>` tag:
```html
<script src="https://zygote.netlify.com/zygote-v1.js"></script>
```

WIP

## Using with a custom API

WIP

## Todo
- Cart items are increasing by 1 when order is placed?
- Send back cart ID on confirmation
- Clear cart after order is placed
- Place order step
	+ Shipping address
	+ Payment method
	+ Remove qty buttons
	+ Remove "x" button
- If user tries to confirm order tab or hit next to confirm pane, validate all inputs and move to any pane where there are errors
- Make sure cart is still visible on all browser heights
- Browser test

- Format card numbers
- Show card type icon
- Format phone numbers
- Only inject parts of cart that are about to get used
- Move media query code into CSS modules
- Printable order confirmation screen
- Test out Google Maps API for address autofill
- Remove tabs and new lines from JS on build
- Patterns attributes in input elements
- Client side validation
