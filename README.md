# Cart

Cart module for Storinka skins.

## Installation

```shell
yarn add @storinka/cart
```

## Usage

```javascript
import Cart from "@storinka/cart";

const coffeeItem = {
    item_type: "dish",
    item_id: 777,
    quantity: 1,
    subitems: [],
};

// create cart instance
const cart = new Cart();

// add item
cart.addItem(coffeeItem);

// remove item
cart.addItem(coffeeItem);

// find item
cart.findItem({ ...coffeeItem });
```
