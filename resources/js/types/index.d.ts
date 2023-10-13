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
    slides: Slide[];
    categories: Category[];
    styles: Style[];
};

export type Order = {
    uuid: string;
    orderCode: number;
    status: string;
    totalAmountUsd: number;
    totalAmountVen: number;
    customerEmail: string;
    customerName: string;
    customerPhoneNumber: string;
    paymentMethod: string;
    shippingMethod: string;
    guideNumber: string | null;
    shippingDate: string | null;
    created_at: string;
  }

  export type Slide = {
    id: number;
    desktopImage: string;
    mobileImage: string;
    title: string;
    order: number;
    description: string;
    label: string;
    action: string;
    position: string;
    active: boolean;
  }

  export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    billboard: string | null;
    order: number;
    products_count: number;
  }

  export type Style = {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    billboard: string | null;
    order: number;
    products_count: number;
  }

  