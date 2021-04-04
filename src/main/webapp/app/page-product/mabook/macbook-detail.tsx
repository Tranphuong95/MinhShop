import './macbook.scss';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Storage} from 'react-jhipster';
import Cart from 'app/modules/shopcart/cart';
import {ProductViews} from "app/page-product/product-history-view/product-view";
import HistoryView from "app/page-product/product-history-view/history-view";

export const MacbookDetail = props =>
{
  const [macbook, setMacbook] = useState(null);
  const page_path = props.match.url;
  const Token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  const authToken = `Bearer ${Token}`;
  const [productView, setProductView] = useState(null);
  const urlPage = props.location.pathname

  useEffect(() =>
  {
    axios({
      url: `api/simple-posts/${props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: authToken,
      },
      // data:typeNameFil
    }).then(res => setMacbook(res.data));
  }, [urlPage]);
  window.console.log(props.match.params.id);
  const [count, setCount] = useState(1);
  const showSlides = () =>
  {
    if (count)
    {
      const slides = document.getElementsByClassName('image-macbook-detail');
      const dots = document.getElementsByClassName('img-thb');
      for (let i = 0; i < slides.length; i++)
      {
        const slide: any = slides[i];
        slide.style.display = 'none';
      }
      for (let i = 0; i < dots.length; i++)
      {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      const slideBlock: any = slides[count - 1];
      slideBlock.style.display = 'block';
      dots[count - 1].className += ' active';
    }
  };
  const currentSlide = n =>
  {
    setCount(n);
    showSlides();
  };
  useEffect(() =>
  {
    currentSlide(count);
  });
  useEffect(() =>
  {
    if (macbook)
    {
      setProductView({
        id: macbook.id,
        name: macbook.title,
        image: macbook.imageUrl,
        url: location.pathname
      })
    }
  }, [macbook])

  useEffect(() =>
  {
    if (productView)
    {
      ProductViews(productView)
    }
  }, [productView])
  return (
    <div>
      <div className="macbook-detail d-flex justify-content-center ">
        <div className=" macbook-detail-header d-xl-flex d-lg-flex col-9 ">
          <div className="image-macbook mt-3  col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div className="image-macbook-detail">
              <img className="image-cover img-fluid" src={macbook ? macbook.imageUrl : null} alt="macbook-detail"/>
            </div>
            <div className="image-macbook-detail">
              <img
                className="image-cover img-fluid"
                src="https://www.asus.com/media/global/products/HYBtGIeaoACCt3lM/P_setting_fff_1_90_end_600.png"
                alt="product-detail"
              />
            </div>
            <div className="image-macbook-detail">
              <img
                className="image-cover img-fluid"
                src="https://www.asus.com/media/global/gallery/jg7rlmrw0kmdyrrj_setting_fff_1_90_end_500.png"
                alt="product-detail"
              />
            </div>
            <div className="list-image-thumbnail row mt-2">
              <div className="image-thumbnail img-1 pr-2 col-4 ">
                <img
                  className="img-thb image-cover img-fluid cursor"
                  onClick={() => currentSlide(1)}
                  src={macbook ? macbook.imageUrl : null}
                  alt="macbook-detail"
                />
              </div>
              <div className="image-thumbnail img-2 px-1 col-4">
                <img
                  className="img-thb image-cover img-fluid cursor"
                  onClick={() => currentSlide(2)}
                  src="https://www.asus.com/media/global/products/HYBtGIeaoACCt3lM/P_setting_fff_1_90_end_600.png"
                  alt="product-detail"
                />
              </div>
              <div className="image-thumbnail img-3 pl-2 col-4">
                <img
                  className="img-thb image-cover img-fluid cursor"
                  onClick={() => currentSlide(3)}
                  src="https://www.asus.com/media/global/gallery/jg7rlmrw0kmdyrrj_setting_fff_1_90_end_500.png"
                  alt="product-detail"
                />
              </div>
            </div>
          </div>
          <div className="product-description mt-3 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <h5>SẢN PHẨM ĐỒ GỖ 1</h5>
            <hr/>
            <table className="col-12">
              <tbody>
              <tr>
                <th>
                  <strong>TÊN SẢN PHẨM</strong>
                </th>
                <td>Thùng gố đựng rượu 20 lít</td>
              </tr>
              <tr>
                <th rowSpan={2}>
                  <strong>KÍCH THƯỚC</strong>
                </th>
                <td>+ Mặt thùng: 30 cm</td>
              </tr>
              <tr>
                <td>+Thân thùng: 40 cm</td>
              </tr>
              <tr>
                <th>
                  <strong>PHỤ KIỆN</strong>
                </th>
                <td>01 Chân thùng (chưa có vòi triết rượu)</td>
              </tr>
              <tr>
                <th>
                  <strong>CHẤT LIỆU</strong>
                </th>
                <td>Gỗ sồi nhập khẩu</td>
              </tr>
              <tr>
                <th>
                  <strong>BẢO HÀNH</strong>
                </th>
                <td>12 tháng (lỗi nhà sản xuất)</td>
              </tr>
              <tr>
                <th>
                  <strong>PHỤ KIỆN</strong>
                </th>
                <td>01 Chân thùng (chưa có vòi triết rượu)</td>
              </tr>
              <tr>
                <th>
                  <strong>ĐỊA CHỈ</strong>
                </th>
                <td></td>
              </tr>
              <tr>
                <td>- Hà Nội</td>
                <td>Số 63/96 phố Đại Từ - Hoàng Mai</td>
              </tr>
              <tr>
                <td>- TPHCM</td>
                <td>Số 250 Lê Văn Khương - P. Thới An - Q.12</td>
              </tr>
              <tr>
                <td> - Xưởng SX</td>
                <td>Làng nghề Đọi Tam, Duy Tiên, Hà Nam</td>
              </tr>
              <tr>
                <th>
                  <strong>Hotline</strong>
                </th>
                <td>0327.247.999</td>
              </tr>
              </tbody>
            </table>
            <hr/>
            <div>
              {/*todo shop-cart*/}
              {macbook !== undefined && macbook !== null ? (
                <div className="macbook-detail-price">
                  <div>
                    Giá gốc: <span className="text-primary">{macbook.price.toLocaleString()}đ</span>
                  </div>
                  <div>
                    Giá khuyến mãi: <span className="text-danger">{macbook.salePrice.toLocaleString()}đ</span>
                  </div>
                  <Cart cartProductDetail={macbook} page_path={page_path}/>
                  {/*<Cart productestEntity={macbookDetail}/>*/}
                </div>
              ) : (
                '...loading'
              )}
            </div>
          </div>
        </div>
        <div className="product-detail-content">{/*<ProductDetailContent/>*/}</div>
      </div>
      <HistoryView/>
    </div>
  );
};
export default MacbookDetail;
