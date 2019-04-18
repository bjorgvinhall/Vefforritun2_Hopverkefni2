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
  total: number;
  line_number: number;
  cart_total: number;
  created?: Date;
  updated?: Date;
}

export interface Ierrors {
  field: string;
  error: string;
}

// todo fleiri týpur
