import './checkout.scss';
import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, FormText, Input, Label} from 'reactstrap';
import axios from 'axios';
import {NavLink, Redirect} from 'react-router-dom';
import VerifieOrder from 'app/modules/checkout-cart/verifie-order';

import {Base64} from 'js-base64';
import {deleteCart} from 'app/modules/shopcart/actions/cart.action';
import {connect} from 'react-redux';

const CheckoutCart = props =>
{
  const [testsdiachiList, setTestsdiachiList] = useState([]);
  const [testsTenQuan, setTestsTenQuan] = useState([]);
  const [statusApi, setStatusApi] = useState('');
  const [CartItems, setCartItems] = useState([]);
  const [provinceNames, setProvinceNames] = useState('');
  const cart: any = localStorage.getItem('cartItems');
  useEffect(() =>
  {
    setCartItems(JSON.parse(cart));
  }, [cart]);
  // const CartItems = JSON.parse(localStorage.getItem("cartItems"));
  const totalPrice = () =>
  {
    let total = 0;
    if (CartItems && CartItems.length > 0)
    {
      CartItems.map(item =>
      {
        total += item.count * item.product.salePrice;
      });
    }
    return total;
  };
  const [informationProducts, setInformationProducts] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    districtName: '',
    address: '',
    message: '',
    product: CartItems,
    totalPrice: totalPrice(),
    provinceName: '',
  });
  useEffect(() =>
  {
    axios({
      method: 'get',
      url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
      headers: {Token: 'e1266833-639e-11eb-86b9-8a61086fe5fd'},
    }).then(response => setTestsdiachiList(response.data.data));
  }, []);

  const totalProduct = () =>
  {
    let total = 0;
    if (CartItems && CartItems.length > 0)
    {
      CartItems.map(item =>
      {
        total += item.count;
      });
    }
    return total;
  };

  const ProductInfor = () =>
  {
    return (
      <div className="product-customer col-4">
        <div className="title">
          <h5>Đơn hàng ({totalProduct()} sản phẩm)</h5>
        </div>
        <div className="infor-content">
          <div className="content-product">
            {CartItems && CartItems.length > 0 ? (
              CartItems.map((item, index) =>
              {
                return (
                  <div className="product" key={index * 11011}>
                    <div className="image col-4">
                      <NavLink to={item.product.url}>
                        <img src={item.product.imageUrl}/>
                      </NavLink>
                    </div>
                    <div className="title-product col-4">
                      <NavLink to={item.product.url}>{item.product.title}</NavLink>
                    </div>
                    <div className="price col-4">
                      <div className="tt-price">{Number(item.product.salePrice).toLocaleString()}₫</div>
                      <div className="quantity">x{item.count}</div>
                      <div className="tt-price">
                        <strong>{(item.count * Number(item.product.salePrice)).toLocaleString()}₫</strong>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <strong>Bạn chưa đăng ký mua sản phẩm nào</strong>
            )}
          </div>
          <div className="total-price">
            <div>
              Tổng tiền: <strong>{totalPrice().toLocaleString()}đ</strong>
            </div>
            <div>Cước vận chuyển</div>
            <div>
              Số tiền cần thanh toán:<strong>{totalPrice().toLocaleString()}đ</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showProvinceName = event =>
  {
    const province = event.target.options[event.target.selectedIndex].text;
    setProvinceNames(province);
  };

  const onHandleChange = event =>
  {
    setInformationProducts({
      ...informationProducts,
      [event.target.name]: event.target.value,
      product: CartItems,
      totalPrice: totalPrice(),
      provinceName: provinceNames,
    });
  };

  const FindProvinceId = event =>
  {

    axios({
      method: 'post',
      url: ' https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Token: 'e1266833-639e-11eb-86b9-8a61086fe5fd',
      },
      data: {
        province_id: JSON.parse(event.target.value),
      },
    }).then(response => setTestsTenQuan(response.data.data));
    // onHandleChange(event)
    showProvinceName(event);
  };


  //todo tao cookie
  const setCookie = (cname, cvalue, exdays) =>
  {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/';
  };
  const onCheckoutSubmit = event =>
  {
    event.preventDefault();
    window.console.log(informationProducts);
    if (CartItems && CartItems.length > 0)
    {
      axios({
        method: 'post',
        url: 'http://localhost:4001/informationProducts',
        data: informationProducts,
      })
        .then(res =>
        {
          const cookieCart = {
            id: res.data.id,
            name: res.data.name,
            phoneNumber: res.data.phoneNumber,
            email: res.data.email,
            provinceName: res.data.provinceName,
            districtName: res.data.districtName,
            address: res.data.address,
            message: res.data.message,
            totalPrice: res.data.totalPrice,
            product: res.data.product.map(i => ({
              product: {
                title: i.product.title,
                image: i.product.imageUrl,
                price: i.product.salePrice,
                url: i.product.url,
              },
              count: i.count,
            })),
          };
          setCookie('_cart', Base64.encode(encodeURIComponent(JSON.stringify(cookieCart))), 30); //todo cần xem xét khi dữ liệu quá lớn
          setStatusApi(res.statusText);
          props.deleteCart();
        })
        .catch(error => alert(error.message));
    }
    else
    {
      return alert('Vui lòng đăng ký mua sản phẩm');
    }
  };

  if (statusApi === 'Created')
  {
    return <Redirect to="/hoantatgiaohang"/>;
  }
  return (
    <section className="checkout-custom col-9">
      <VerifieOrder statusApi={statusApi}/>
      <Form onSubmit={onCheckoutSubmit}>
        <div className="checkout-information">
          <div className="infor-customer col-8">
            <div className="title">
              <h5>Thông tin thanh toán</h5>
            </div>
            <div className="infor-content">
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Họ tên</Label>
                <Input
                  className="col-9 right"
                  type="text"
                  name="name"
                  value={informationProducts.name}
                  onChange={onHandleChange}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Điện thoại</Label>
                <Input
                  className="col-9 right"
                  type="text"
                  name="phoneNumber"
                  value={informationProducts.phoneNumber}
                  onChange={onHandleChange}
                  placeholder="Ví dụ: 0387654321"
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">
                  Email
                  <FormText>(Không bắt buộc)</FormText>
                </Label>
                <Input
                  className="col-9 right"
                  type="email"
                  name="email"
                  value={informationProducts.email}
                  onChange={onHandleChange}
                  placeholder="supportxyz@gmail.com"
                ></Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Tỉnh/Thành phố</Label>
                {/*<Input  type="select" name="cityName" value={cityName} onChange={onChangeCity}>*/}
                <Input className="col-9 right" type="select" name="provinceId" onChange={FindProvinceId} required>
                  <option value="">--Chọn thành phố--</option>
                  {testsdiachiList && testsdiachiList.length > 0
                    ? testsdiachiList.map((item, index) =>
                    {
                      return (
                        <option key={index * 111} value={item.ProvinceID}>
                          {item.ProvinceName}
                        </option>
                      );
                    })
                    : ''}
                </Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Quận/huyện</Label>
                {/*<Input  type="select" name="districName" value={districName} onChange={onChangeDistric}>*/}
                <Input
                  className="col-9 right"
                  type="select"
                  name="districtName"
                  value={informationProducts.districtName}
                  onChange={onHandleChange}
                  required
                >
                  <option value="">--Chọn quận huyện--</option>
                  {testsTenQuan && testsTenQuan.length > 0
                    ? testsTenQuan.map((item, index) =>
                    {
                      return <option key={index * 1103}>{item.DistrictName}</option>;
                    })
                    : ''}
                </Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Địa chỉ chi tiết</Label>
                <Input
                  className="col-9 right"
                  type="text"
                  name="address"
                  value={informationProducts.address}
                  onChange={onHandleChange}
                  placeholder="Ví dụ: Số 64, Ngõ 2, Đường ABC"
                ></Input>
              </FormGroup>
              <FormGroup className="checkout-group">
                <Label className="col-3 left">Lời nhắn</Label>
                <Input
                  className="col-9 right"
                  type="textarea"
                  name="message"
                  value={informationProducts.message}
                  onChange={onHandleChange}
                  placeholder="Ví dụ: Chuyển ngoài giờ hành chính"
                ></Input>
              </FormGroup>
              <FormGroup>
                <FormText>This is form text</FormText>
              </FormGroup>
            </div>
            <div className="btn-right">
              <Button type="submit" className="btn btn-checkout text-white">
                Tiếp tục
              </Button>
            </div>
          </div>
          <ProductInfor/>
        </div>
      </Form>
    </section>
  );
};

const mapDispatchToProps = {
  deleteCart,
};

export default connect(null, mapDispatchToProps)(CheckoutCart);
