export interface OrderInputV3 {
    type: "takeout" | "delivery";
    payment_type: "fondy" | "terminal" | "cash";
    customer: OrderCustomerInputV3;
    message?: null | string;
    delivery_address?: null | OrderDeliveryAddressInputV3;
    takeout_address_id?: null | number;
    expected_time?: null | string;
    items: Array<OrderItemInputV3>;
}

export interface OrderCustomerInputV3 {
    name: string;
    phone: string;
}

export interface OrderDeliveryAddressInputV3 {
    short: string;
    details?: null | string;
    lat?: null | number;
    lng?: null | number;
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
    public payment_type: "fondy" | "terminal" | "cash";

    public customer: OrderCustomerInputV3;
    public deliveryAddress?: OrderDeliveryAddressInputV3;
    public expected_time?: number;
    public takeout_address_id?: number;

    public message?: string;

    public items: OrderItemInputV3[];

    constructor() {
        this.type = "takeout";
        this.payment_type = "cash";

        this.customer = {
            name: "",
            phone: "",
        };

        this.deliveryAddress = {
            short: "",
            lat: 0,
            lng: 0,
            details: "",
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
        return this.items.find(i => {
            const sameType = i.item_type === item.item_type;
            const sameId = i.item_id === item.item_id;

            let sameSubitems = i.subitems.length === item.subitems.length;
            if (sameSubitems) {
                for (const iSubitem of i.subitems) {
                    if (!item.subitems.find(subitem => subitem.item_type === iSubitem.item_type && subitem.item_id === iSubitem.item_id)) {
                        sameSubitems = false;
                        break;
                    }
                }
            }

            return sameType && sameId && sameSubitems;
        });
    }

    buildOrder(): OrderInputV3 {
        return {
            type: this.type,
            payment_type: this.payment_type,
            customer: this.customer,
            delivery_address: this.deliveryAddress,
            expected_time: this.expected_time,
            takeout_address_id: this.takeout_address_id,
            items: this.items,
            message: this.message
        } as OrderInputV3;
    }
}
