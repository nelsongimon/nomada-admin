export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
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
    attributes: Attribute[];
    values: AttributeValue[];
    products: Product[];
    product: Product;
    tags: Tag[];
    users: User[];
    newProductsCount: number;
    featuredProductsCount: number;
    notPublishedProductsCount: number;
};

export type Order = {
    id: string;
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
    color: string;
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

  export type Attribute = {
    id: number;
    name: string;
    order: number;
    attribute_values: AttributeValue[];
  }

  export type AttributeValue = {
    id: number;
    name: string;
    slug: string;
    order: number;
    image: string | null;
    value: string | null;
    products_count: string;
  }

  export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    salePrice: string;
    promotionalPrice: string | null;
    quantity: number | null;
    visibility: boolean;
    featured: boolean;
    isNew: boolean;
    model: string | null;
    created_at: string;
    category: Category;
    style: Style;
    images: Image[];
    tags: Tag[];
    attributeValues: AttributeValue[];
    specificationImage: string | null;
  }

  export type Tag = {
    id: number;
    name: string;
  }

  export type Image = {
    id: number;
    image: string;
  }

  