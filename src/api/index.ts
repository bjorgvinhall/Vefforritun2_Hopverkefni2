import 'isomorphic-fetch';
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

/**
 * Sækir vörur fyrir forsíðu
 * @param limit Hversu margar vörur á að sækja
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
 * Sækir alla flokkana
 */
export async function getCategories() {
  const url = new URL(`categories?limit=500`, baseurl);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Sækir upplýsingar um vöru
 * @param id Auðkenni vöru
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
 * Sækir vörur í ákveðnum vöruflokk á /categories
 * @param id Auðkenni vöru
 * @param limit Hve margar vörur á að sækja
 * 
 */
export async function getCategory(id: number, limit: number) {
  const url = new URL(`products?category=${id}&limit=${limit}`, baseurl);
  const response = await fetch(url.href);
  if (!response.ok) {
    return null;
  }
  
  const result = await response.json();
  
  return result;
}

/**
 * Sækir vörur í ákveðnum vöruflokk á /categories
 * @param id Auðkenni vöru
 * @param limit Hve margar vörur á að sækja
 * 
 */
export async function getPage(link: any, id: number) {
  const response = await fetch(`${link.href}&category=${id}`);
  if (!response.ok) {
    return null;
  }
  
  const result = await response.json();
  
  return result;
}

/**
 * Sækir vörur í ákveðnum vöruflokk
 * @param id Auðkenni vöru
 * @param limit Hve margar vörur á að sækja
 * 
 */
export async function getProductsFromCat(id: number, limit: number) {
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

/**
 * Bætir við vöru(m) í körfu
 * @param product Vara sem notandi vill setja í körfu
 * @param quantity Fjöldi af tiltekinni vöru
 */
export async function addToCart(product: number, quantity: number) {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    body: JSON.stringify({
      product, 
      quantity
    }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'POST',
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
 * Býr til nýjan notanda
 * @param username Notandanafn
 * @param password Lykilorð
 * @param email Netfang
 */
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

/**
 * Skráir inn notanda
 * @param username Notandanafn notanda
 * @param password Lykilorð notanda
 */
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

/**
 * Nær í körfu notanda
 */
async function getCart() {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };
  
  const url = new URL(`cart`, baseurl);
  const response = await fetch(url.href, options);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Uppfærir stöðu körfunnar
 * @param id Auðkenni sem varan hefur í körfunni (ekki auðkenni vöru)
 * @param quantity Fjöldi tiltekinnar vöru í körfu
 */
export async function updateCart(id: number, quantity: number) {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  
  const options = {
    body: JSON.stringify({
      quantity
    }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'PATCH',
  };

  const url = new URL(`cart/line/${id}`, baseurl);

  const response = await fetch(url.href, options);
  const result = await response.json();

  return {
    success: response.ok,
    result
  }
}

/**
 * Fjarlægir vöru úr körfu
 * @param id Auðkenni sem varan hefur í körfunni (ekki auðkenni vöru)
 */
export async function removeFromCart(id: number) {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'DELETE',
  };

  const url = new URL(`cart/line/${id}`, baseurl);
  const response = await fetch(url.href, options);

  return response.ok;
}

/**
 * Býr til pöntun sem notandi leggur inn
 * @param name Nafn notanda
 * @param address Heimilisfang notanda
 */
export async function placeOrder(name: string, address: string) {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    body: JSON.stringify({
      name,
      address
    }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'POST',
  };
  
  const url = new URL('/orders', baseurl);
  const response = await fetch(url.href, options);
  const result = await response.json();
  
  return {
    success: response.ok,
    result
  }
}

/**
 * Sækir pantanir
 */
export async function getOrders() {
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };
  
  const url = new URL(`orders`, baseurl);
  const response = await fetch(url.href, options);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Sækir upplýsingar um pöntun
 * @param id Auðkenni pöntunar
 */
export async function getOrderInfo(id: number) { 
  // Sækir token úr localstorage, ef ekki til þá tómistrengurinn
  const token = localStorage.getItem('token') || '';
  const options = {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };

  const url = new URL(`orders/${id}`, baseurl);
  const response = await fetch(url.href, options);
  
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  
  return result;
}

/**
 * Sækir upplýsingar um flokk
 * @param id númer flokks
 */
export async function getCategoryDetails(id: number) {
  const url = new URL(`categories/${id}`, baseurl);
  const response = await fetch(url.href);
  if (!response.ok) {
    return null;
  }
  const result = await response.json();
  return result;
  
}

/**
 * Leita í ákveðnum flokki
 * @param searchString leitarstrengur
 * @param id númer flokks
 */
export async function searchInCategory(searchString: string, id: number) {
  const options = {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  };
  const url = new URL(`products?search=${searchString}&category=${id}`, baseurl);
  const response = await fetch(url.href, options);
  const result = await response.json();
  return {
    success: response.ok,
    result
  }
}

export {
  getProducts,
  getCart,
};
