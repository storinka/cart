export interface OrderInputV4 {
    type: "takeout" | "delivery";
    payment_type: "fondy" | "terminal" | "cash";
    customer: OrderCustomerInputV3;
    message?: null | string;
    delivery_address?: null | OrderDeliveryAddressInputV4;
    takeout_address_id?: null | number;
    expected_time?: null | string;
    items: Array<OrderItemInputV3>;
}

export interface OrderCustomerInputV3 {
    name: string;
    phone: string;
}

export interface OrderDeliveryAddressInputV4 {
    short: string;
    details?: null | string;
    lat?: null | number;
    lng?: null | number;
    street_name: string,
    street_city: string,
    house: string,
}

export interface OrderItemInputV3 {
    item_type: "dish" | "variant";
    item_id: number;
    quantity: number;
    subitems: Array<OrderSubitemInputV3>;
}

export interface OrderSubitemInputV3 {
    item_type: "option";
    item_id: number;
}

export default class Cart {
    public type: "takeout" | "delivery";
    public paymentType: "fondy" | "terminal" | "cash";

    public customer: OrderCustomerInputV3;
    public deliveryAddress?: OrderDeliveryAddressInputV4;
    public expectedTime?: number;
    public takeoutAddressId?: number;
    public message?: string;

    public items: OrderItemInputV3[];

    constructor() {
        this.type = "takeout";
        this.paymentType = "cash";

        this.customer = {
            name: "",
            phone: "",
        };

        this.deliveryAddress = {
            short: "",
            lat: 0,
            lng: 0,
            details: "",
            street_name: "",
            street_city: "",
            house: "",
        };

        this.items = [];
    }

    addItem(item: OrderItemInputV3): void {
        const existingItem = this.findItem(item);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(item: OrderItemInputV3): void {
        const existingItem = this.findItem(item);

        if (existingItem) {
            this.items = this.items.filter(i => i !== existingItem);
        }
    }

    findItem(item: OrderItemInputV3): OrderItemInputV3 | undefined {
        return this.items.find(i => this.itemsEq(i, item));
    }

    itemsEq(item1: OrderItemInputV3, item2: OrderItemInputV3): boolean {
        const sameType = item1.item_type === item2.item_type;
        const sameId = item1.item_id === item2.item_id;

        let sameSubitems = item1.subitems.length === item2.subitems.length;
        if (sameSubitems) {
            for (const iSubitem of item1.subitems) {
                if (!item2.subitems.find(subitem => this.subitemsEq(subitem, iSubitem))) {
                    sameSubitems = false;
                    break;
                }
            }
        }

        return sameType && sameId && sameSubitems;
    }

    subitemsEq(subitem1: OrderSubitemInputV3, subitem2: OrderSubitemInputV3): boolean {
        return subitem1.item_type === subitem2.item_type && subitem1.item_id === subitem2.item_id;
    }

    buildOrder(): OrderInputV4 {
        return {
            type: this.type,
            payment_type: this.paymentType,
            customer: this.customer,
            delivery_address: this.deliveryAddress,
            expected_time: this.expectedTime,
            takeout_address_id: this.takeoutAddressId,
            items: this.items,
            message: this.message
        } as OrderInputV4;
    }
}
