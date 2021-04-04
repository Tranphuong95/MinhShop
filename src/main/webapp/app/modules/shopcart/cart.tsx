import './shop-cart.scss';
import React, {useEffect, useState} from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {AvField, AvForm, AvGroup} from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import CartContent from 'app/modules/shopcart/cart-content';
import {connect, useDispatch} from 'react-redux';
import {IRootState} from 'app/shared/reducers';
import {Link} from 'react-router-dom';
import {addToCart, updateInCart} from 'app/modules/shopcart/actions/cart.action';
import {fetchProducts} from 'app/modules/shopcart/actions/product.action';

// export interface ICartShopProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {};
export const Cart = props =>
{
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const {page_path} = props;

  useEffect(() =>
  {
    if (quantity >= 100)
    {
      setQuantity(100);
    }
    if (!quantity)
    {
      setQuantity(1);
    }
  });
  useEffect(() =>
  {
    dispatch(props.fetchProducts);
  }, [dispatch]);

  // useEffect(()=>{
  //   setCartItems(props.cartItems) //todo đưa vào effect để thay đổi giá trị của cartItems khi xóa cartItems trong local storage
  // },[cartItems])

  const onChangeProductQuantity = event =>
  {
    setQuantity(event.target.value);
  };

  const onChangeQuantity = value =>
  {
    setQuantity(Number(quantity) + Number(value));
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const {cartItems, products} = props;
  // const productShops:any=products;

  const {cartProductDetail} = props;


  cartProductDetail.url = page_path;  //add url to cart

  const onAddToCart = () =>
  {
    toggle();
    props.addToCart(cartProductDetail, quantity);
  };

  const onShowTotalProduct = () =>
  {
    let total = 0;
    if (cartItems.cartItems && cartItems.cartItems.length > 0)
    {
      cartItems.cartItems.map(item =>
      {
        total += item.count;
      });
    }
    return total;
  };
  const showId = () =>
  {
    let id = null;
    if (cartItems.cartItems && cartItems.cartItems.length > 0)
    {
      id = cartItems.cartItems.map(item =>
      {
        item.product.id;
      });
    }
    return id;
  };
  return (
    <div className="shop-modal-content mt-3">
      <AvForm inline>
        <AvGroup className="button-quantity-group" inline>
          <Label id="editorLabel" for="editor-editor">
            <span>Số lượng</span>
          </Label>
          <Button disabled={quantity <= 1} color="link">
            <FontAwesomeIcon icon={faMinus} onClick={() => onChangeQuantity(-1)}/>
          </Button>
          <AvField
            id={`product-quantity/${showId()}`}
            className="btn-product-quantity"
            type="text"
            name="quantity"
            onChange={onChangeProductQuantity}
            value={quantity}
          />
          <Button disabled={quantity >= 100} color="link">
            <FontAwesomeIcon icon={faPlus} onClick={() => onChangeQuantity(1)}/>
          </Button>
        </AvGroup>
        {/*<Button>Đăng Ký mua hàng</Button>*/}
        <Button className="add-to-cart ml-3" type="submit" color="danger" onClick={onAddToCart}>
          ĐĂNG KÝ MUA HÀNG
        </Button>
      </AvForm>
      {/*<Modal isOpen={modal} toggle={toggle} className={className}>*/}
      <Modal isOpen={modal} className="cart-modal">
        {' '}
        {/*todo change 20/1*/}
        {/*<Button color="danger" onClick={toggle}>ĐĂNG KÝ MUA HÀNG</Button>*/}
        <ModalHeader toggle={toggle} className="cart-title-content">
          Giỏ hàng của bạn ({onShowTotalProduct()} sản phẩm)
        </ModalHeader>
        <ModalBody>
          <CartContent cartItems={cartItems} page_path={page_path}/>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={toggle}>
            Tiếp tục mua hàng
          </Button>{' '}
          <Button tag={Link} to="/checkout" color="primary">
            Tiến hành thanh toán
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({cartShop, productShop}: IRootState) =>
{
  return {
    cartItems: cartShop,
    products: productShop,
  };
};
const mapDispatchToProps = {
  addToCart,
  fetchProducts,
  updateInCart,
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
