import { IProduct } from './types';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

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
};
