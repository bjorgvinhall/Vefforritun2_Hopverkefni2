export interface ICategory {
  id: number;
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: ICategory;
  category_id: number;
  category_title: string;
  description?: string;
  created?: Date;
  updated?: Date;
}

export interface ICart {
  id: number;
  title: string;
  quantity: number;
  image: string;
  total: number;
  line_number: number;
  cart_total: number;
  created?: Date;
  updated?: Date;
}

export interface IOrders {
  id: number;
  name: string;
  address: string;
  user_id: number;
  created?: Date;
  updated?: Date;
}

export interface IOrder {
  id: number; 
  quantity: number; 
  product_id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
  category_title: string;
  total: number;
  created?: Date;
  updated?: Date; 
}

export interface Ierrors {
  field: string;
  error: string;
}