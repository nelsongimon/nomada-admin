export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    order: Order;
    orders: Order[];
};

export type Order = {
    uuid: string;
    order_code: number;
    status: string;
    total_amount_usd: number;
    total_amount_ven: number;
    customer_email: string;
    customer_name: string;
    customer_phone_number: string;
    created_at: string;
    payment_method: string;
    shipping_method: string;
    guide_number: string | null;
    shipping_date: string | null;
  }