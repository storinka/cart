export interface OrderInput {
    type: "takeout" | "delivery";
    payment_type: "fondy" | "terminal" | "cash";
    customer: OrderCustomerInput;
    message?: null | string;
    delivery_address?: null | OrderDeliveryAddressInput;
    takeout_address_id?: null | number;
    expected_time?: null | string;
    items: Array<OrderItemInput>;
}

export interface OrderCustomerInput {
    name: string;
    phone: string;
}

export interface OrderDeliveryAddressInput {
    short: string;
    details?: null | string;
    lat?: null | number;
    lng?: null | number;
}

export interface OrderItemInput {
    item_type: "dish" | "variant" | "option";
    item_id: number;
    quantity: number;
    subitems: Array<OrderSubitemInput>;
}

export interface OrderSubitemInput {
    item_type: string;
    item_id: number;
    quantity: number;
}

export default class Cart {
    public type: "takeout" | "delivery";
    public payment_type: "fondy" | "terminal" | "cash";

    public customer: OrderCustomerInput;
    public deliveryAddress?: OrderDeliveryAddressInput;
    public expected_time?: number;
    public takeout_address_id?: number;

    public message?: string;

    protected items: OrderItemInput[];

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

    addItem(item: OrderItemInput): void {
        const existingItem = this.findItem(item);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(item: OrderItemInput): void {
        const existingItem = this.findItem(item);

        if (existingItem) {
            this.items = this.items.filter(i => i !== existingItem);
        }
    }

    findItem(item: OrderItemInput): OrderItemInput | undefined {
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

    buildOrder(): OrderInput {
        return {
            type: this.type,
            payment_type: this.payment_type,
            customer: this.customer,
            delivery_address: this.deliveryAddress,
            expected_time: this.expected_time,
            takeout_address_id: this.takeout_address_id,
            items: this.items,
            message: this.message
        } as OrderInput;
    }
}
