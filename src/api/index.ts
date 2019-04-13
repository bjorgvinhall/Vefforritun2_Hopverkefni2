import { IProduct } from './types';
import 'isomorphic-fetch';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

async function getProducts() {
  const url = new URL(`/products`, baseurl);
  const response = await fetch(url.href);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

async function getProduct(id: number | string) : Promise<IProduct> {
  // todo sækja vöru

  const product: IProduct = {
    category: {
      id: 10,
      title: "Flokkur",
    },
    id: 1,
    image: '',
    price: 100,
    title: "Prufuvara",
  };

  return new Promise((resolve) => resolve(product))
}

export {
  getProduct,
  getProducts,
};
