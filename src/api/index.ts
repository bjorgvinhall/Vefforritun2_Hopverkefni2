import { IProduct } from './types';
import 'isomorphic-fetch';
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

// Sækir token úr localstorage, ef ekki til þá tómistrengurinn
const token = localStorage.getItem('token') || '';

// Hægt að senda tokenið svona
export async function test() {
  const options = {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };
  const url = new URL('/cart', baseurl);

  const response = await fetch(url.href, options);
  const result = await response.json();
  return {
    success: response.ok,
    result
  }
}

/**
 * Sækir vörur fyrir forsíðu
 * @param limit hversu margar vörur á að sækja
 * 
 * TODO hægt að bæta við offset til að sækja næstu síðu
 * 
 */
async function getProducts(limit: number) {
  const url = new URL(`products/?limit=${limit}`, baseurl);
  const response = await fetch(url.href);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Sækir upplýsingar um vöru
 * @param id númer vöru
 */
export async function getProductDetails(id: number) {
  const url = new URL(`products/${id}`, baseurl);
  const response = await fetch(url.href);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Sækir vörur í ákveðnum vöruflokk
 * @param id númer vöru
 * @param id númer vöru
 * 
 */
export async function getProductsFormCat(id: number, limit: number) {
  const product = await getProductDetails(id);
  const category = product.category_id;
  const url = new URL(`products?category=${category}&limit=${limit}`, baseurl);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result.items;
}


export async function registerUser(username: any, password: any , email: any) {
  const options = {
    body: JSON.stringify({
      username,
      password, 
      email
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };
  const url = new URL('/users/register', baseurl);

  const response = await fetch(url.href, options);
  const result = await response.json();
  return {
    success: response.ok,
    result
  }
}

export async function loginUser(username: any, password: any) {
  const options = {
    body: JSON.stringify({
      username,
      password, 
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };
  const url = new URL('/users/login', baseurl);

  const response = await fetch(url.href, options);
  const result = await response.json();
  return {
    success: response.ok,
    result
  }
}


export {
  getProducts,
};
