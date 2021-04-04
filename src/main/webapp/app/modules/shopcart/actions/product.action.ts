import {FETCH_PRODUCTS} from 'app/modules/shopcart/actions/types';
import axios from 'axios';

export const fetchProducts = () => async dispatch =>
{
  // const res = await fetch('api/simple-posts');
  // const data = await res.json();

  // dispatch({
  //   type: FETCH_PRODUCTS,
  //   payload: data,
  // });
  // fetch('http://localhost:8080/api/productests', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //       .then(response => response.json())
  //       .then(data=>{dispatch({
  //         type:FETCH_PRODUCTS,
  //         payload: data
  //       })})
  const res = await axios({
    method: 'get',
    url: 'api/simple-posts',
  });
  const data = await res.data;
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
