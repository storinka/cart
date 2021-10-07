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

## Properties

### `type`:

- Type: `string`
- Values: `takeout | delivery`

Type of the order.

### `paymentType`:

- Type: `string`
- Values: `fondy | terminal | cash`

Payment method.

### `customer`:

- Type: `OrderCustomerInputV3`

Customer information.

### `deliveryAddress`:

- Type: `OrderDeliveryAddressInputV3 | undefined`

Delivery address information when order type is delivery.

### `expectedTime`:

- Type: `number | undefined`

Expected taking time when order type is takeout.

### `message`:

- Type: `string | undefined`

Customer note.

### `items`:

- Type: `OrderItemInputV3[]`

Order items.

## Functions

### `addItem(item: OrderItemInputV3)`:

- Result: `void`

Add an item to the cart. If such item already exists (type, id and subitems do match), then quantity will be increased
instead of adding new item.

### `removeItem(item: OrderItemInputV3)`:

- Result: `void`

Remove an item from the cart.

### `findItem(item: OrderItemInputV3)`:

- Result: `OrderItemInputV3 | undefined`

Find an item in the cart. You can use it to check whether an item was already added to the cart or not.

### `itemsEq(item1: OrderItemInputV3, item2: OrderItemInputV3)`:

- Result: `boolean`

Check if two items are equal.

### `subitemsEq(subitem1: OrderSubitemInputV3, subitem2: OrderSubitemInputV3)`:

- Result: `boolean`

Check if two subitems are equal.

### `buildOrder()`:

- Result: `OrderInputV3`

Create order input from the cart.
