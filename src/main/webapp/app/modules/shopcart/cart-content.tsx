import './shop-cart.scss';
import React from 'react';
import {Button, Label, Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
// import { updateInCart} from "app/products/shopcart/actions/cart.action";
import {connect} from 'react-redux';
import {removeFromCart, updateInCart} from 'app/modules/shopcart/actions/cart.action';
import {Link} from 'react-router-dom';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

const CartContent = props =>
{
  const {cartItems} = props;
  const {page_path} = props;


  const onUpdateInCart = (product, quantity) =>
  {

    if (quantity > 0)
    {
      props.updateInCart(product, quantity);
    }
  };
  const onRemoveFromCart = (product, quantity) =>
  {
    if (quantity > 0)
    {
      props.removeFromCart(product);
    }
  };
  const onTotalPrice = () =>
  {
    let total = 0;
    if (cartItems.cartItems && cartItems.cartItems.length > 0)
    {
      cartItems.cartItems.map(item =>
      {
        total += item.count * item.product.salePrice;
      });
    }
    return total;
  };
  const showCartItems = () =>
  {
    let result = null;
    if (cartItems.cartItems && cartItems.cartItems.length > 0)
    {
      result = cartItems.cartItems.map((item, index) =>
      {
        return (
          <tr key={index * 107}>
            <td scope="row" className="infor-product">
              <div>
                <Link to={page_path} target="_blank">
                  <img src={item.product.imageUrl}/>
                </Link>
                <div className="cart-product-content">
                  {/*<div>{item.product.tensanpham}</div>*/}
                  <Link to={page_path} target="_blank">
                    <FroalaEditorView model={item.product.title}/>
                  </Link>
                  <Button color="link" onClick={() => onRemoveFromCart(item.product, item.count)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x"/>
                    Xóa sản phẩm
                  </Button>
                </div>
              </div>
            </td>
            <td>{item.product.salePrice.toLocaleString()}đ</td>
            <td>
              <div className="input-group" key={index * 1001}>
                <Label id="editorLabel" for="editor-editor"></Label>
                <Button disabled={item.count <= 1} color="link">
                  <FontAwesomeIcon icon={faMinus} onClick={() => onUpdateInCart(item.product, item.count - 1)}/>
                </Button>
                <span>{item.count}</span>
                <Button disabled={item.count >= 100} color="link">
                  <FontAwesomeIcon icon={faPlus} onClick={() => onUpdateInCart(item.product, item.count + 1)}/>
                </Button>
              </div>
            </td>
            <td>{Number(item.count * item.product.salePrice).toLocaleString()}đ</td>
          </tr>
        );
      });
    }
    return result;
  };

  return (
    <div>
      <Table>
        <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
        </thead>
        <tbody>{showCartItems()}</tbody>
      </Table>
      <div className="total-price">Tổng tiền: {onTotalPrice().toLocaleString()}đ</div>
    </div>
  );
};
const mapDispatchToProps = {
  updateInCart,
  removeFromCart,
};
type DispatchProps = typeof mapDispatchToProps;
export default connect(null, mapDispatchToProps)(CartContent);
