import './may-console.scss';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Storage} from 'react-jhipster';
import {connect} from 'react-redux';
import Cart from 'app/modules/shopcart/cart';
import {IRootState} from "app/shared/reducers";
import {getEntities as getPostDetails} from "app/entities/post-details/post-details.reducer";

export const MayConsoleDetail = props =>
{
  const [console, setConsole] = useState(null);
  const page_path = props.match.url;
  const Token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  const authToken = `Bearer ${Token}`;
  const {postDetails} = props;
  window.console.log(props.match);
  useEffect(() =>
  {
    axios({
      url: `api/simple-posts/${props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: authToken,
      },
      // data:typeNameFil
    }).then(res => setConsole(res.data));
  }, []);
  useEffect(() =>
  {
    props.getPostDetails()
  }, [])
  window.console.log(props.match.params.id);
  window.console.log(postDetails)

  const [count, setCount] = useState(1);
  const showSlides = () =>
  {
    if (count)
    {
      const slides = Array.from(document.getElementsByClassName('image-console-detail') as HTMLCollectionOf<HTMLElement>);
      const dots = document.getElementsByClassName('img-thb');
      for (let i = 0; i < slides.length; i++)
      {
        slides[i].style.display = 'none';
      }
      for (let i = 0; i < dots.length; i++)
      {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      if (slides && slides.length > 0)
      {
        slides[count - 1].style.display = "block"
      }
      if (dots && dots.length > 0)
      {
        dots[count - 1].className += ' active';
      }
      // slides[count-1].style.display = 'block';
      //  dots[count - 1].className += ' active';
    }
  };
  const currentSlide = n =>
  {
    setCount(n);
    showSlides();
  };
  window.console.log(count)
  useEffect(() =>
  {
    currentSlide(count);
  });
  window.console.log(console);
  const showImages = (id) =>
  {
    window.console.log(id)
    let result = null;
    if (postDetails && postDetails.length > 0)
    {
      postDetails.map(item =>
      {
        if (id && item.id === id)
        {
          if (item.otherData)
          {
            const urls: any = item.otherData;
            const images = JSON.parse(urls);
            if (images && images.length > 0)
            {
              result = images.map(image =>
              {
                window.console.log(image.link)
                return (
                  <div key={image.id + 1232131} className="image-console-detail" style={{display: 'none'}}>
                    <img
                      className="image-cover img-fluid"
                      src={image.link}
                      alt="product-detail"
                    />
                  </div>
                )
              })

            }
          }
        }
      })

    }
    return result
  }
  const showCurentImages = (id) =>
  {
    window.console.log(id)
    let result = null;
    if (postDetails && postDetails.length > 0)
    {
      postDetails.map(item =>
      {
        if (id && item.id === id)
        {
          if (item.otherData)
          {
            const urls: any = item.otherData;
            const images = JSON.parse(urls);
            if (images && images.length > 0)
            {
              result = images.map((image, index) =>
              {
                window.console.log(image.link)
                return (
                  <div key={image.id} className="image-thumbnail img-2 px-1 col-4">
                    <img
                      className="img-thb image-cover img-fluid cursor"
                      onClick={() => currentSlide(index + 1)}
                      src={image.link}
                      alt="product-detail"
                    />
                    {index + 1}
                  </div>
                )
              })

            }
          }
        }
      })

    }
    return result
  }
  return (
    <div className="console-detail d-flex justify-content-center ">
      <div className=" console-detail-header d-xl-flex d-lg-flex col-9 ">
        <div className="image-console mt-3  col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div id="aaa" style={{display: "none"}}>hello</div>
          {showImages(console ? console.id : null)}
          <div className="list-image-thumbnail row mt-2">
            {showCurentImages(console ? console.id : null)}
          </div>
        </div>
        <div className="product-description mt-3 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <h2>{console?console.title:''}</h2>
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
            {console !== undefined && console !== null ? (
              <div className="console-detail-price">
                <div>
                  Giá gốc: <span className="text-primary">{console.price.toLocaleString()}đ</span>
                </div>
                <div>
                  Giá khuyến mãi: <span className="text-danger">{console.salePrice.toLocaleString()}đ</span>
                </div>
                <Cart cartProductDetail={console} page_path={page_path}/>
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
  );
};
const mapStateToProps = (storeState: IRootState) => ({
  postDetails: storeState.postDetails.entities,
})
const mapDispatchToProps = {
  getPostDetails
}
export default connect(mapStateToProps, mapDispatchToProps)(MayConsoleDetail);
