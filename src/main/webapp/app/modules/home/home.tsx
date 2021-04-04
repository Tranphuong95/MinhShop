import './home.scss';

import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, NavLink} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';
import {Storage} from 'react-jhipster';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import {OpenApiPathConst} from "app/page-product/OpenApiPathConst";

const Home = props =>
{
  const Token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  const [tablets, setTablets] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [macbooks, setMacbooks] = useState([]);
  const [gameEquipments, setGameEquipments] = useState([]);

  const authToken = `Bearer ${Token}`;

  useEffect(() =>
  {
    const typePost_id = [
      {id: 1050, f: setTablets},
      {id: 1051, f: setLaptops},
      {id: 1052, f: setConsoles},
      {id: 51001, f: setMacbooks},
      {id: 1054, f: setGameEquipments}];
    typePost_id.map(value =>
    {
      axios({
        url: OpenApiPathConst.SIMPLE_POST_PATH,
        method: 'get',
        headers: {
          Authorization: authToken,
        },
        params: {size: 12, page: 0, typePost_id: value.id},
      }).then(res => value.f(res.data));
    });
  }, []);

  window.console.log(laptops);
  window.console.log(macbooks);
  // const { account } = props;
  return (
    <div className=" home-content d-flex justify-content-center">
      <BreadcrumbsItem glyph="calendar" to="/">
        Trang chủ
      </BreadcrumbsItem>
      <div className="home-container col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-9">
        <section className="panel1-products  mt-5">
          {/*Danh mục sản phẩm*/}
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <NavLink to="/page/may-tinh-bang" tag={Link}>
              <h2>MÁY TÍNH BẢNG</h2>
            </NavLink>
          </header>
          <hr/>
          <div className="section-content d-flex">
            <div
              className="section-banner d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-3 col-lg-3 col-xl-3">
              <NavLink to="/page/may-tinh-bang" tag={Link}>
                <img className="img-fluid" src="content/images/do_go_noi_that_1.png" alt="banner"/>
              </NavLink>
            </div>
            <div className="section-main col-12col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <div className="row d-flex">
                {tablets && tablets.length > 0
                  ? tablets.map(tablet => (
                    <div className="section-product col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-2" key={tablet.uuid}>
                      <NavLink to={`/page/may-tinh-bang/${tablet.id}`} tag={Link}>
                        <Card>
                          <div className="image-size">
                            <CardImg top width="100%" src={tablet.imageUrl} alt="Card image cap"/>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5">{tablet.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Mã sản phẩm: TGSN20
                            </CardSubtitle>
                            <CardText className="d-xl-flex justify-content-between">
                              <span className="price-new">{tablet.salePrice.toLocaleString()}</span>
                              <span className="price-old">{tablet.price.toLocaleString()}</span>
                              <span>
                                <Badge color="warning">-{tablet.percentSale.toFixed(0)}%</Badge>
                              </span>
                            </CardText>
                            <Button color="primary"
                              className="btn-block d-none d-sm-none d-md-none d-lg-block d-xl-block">
                              XEM THÊM CHI TIẾT
                            </Button>
                          </CardBody>
                        </Card>
                      </NavLink>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
          <div
            className="d-flex d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex justify-content-end mt-2">
            <NavLink to="/page/may-tinh-bang" tag={Link}>
              <Badge color="primary" className="p-3">
                XEM THÊM NHIỀU SẢN PHẨM
              </Badge>
            </NavLink>
          </div>
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <NavLink to="/page/lap-top" tag={Link}>
              <h2>LAPTOP</h2>
            </NavLink>
          </header>
          <hr/>
          <div className="section-content d-flex">
            <div
              className="section-banner d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-3 col-lg-3 col-xl-3">
              <NavLink to="/may-tinh-bang" tag={Link}>
                <img className="img-fluid" src="content/images/do_go_noi_that_1.png" alt="banner"/>
              </NavLink>
            </div>
            <div className="section-main col-12col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <div className="row d-flex">
                {laptops && laptops.length > 0
                  ? laptops.map(laptop => (
                    <div className="section-product col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-2" key={laptop.uuid}>
                      <NavLink to={`/page/lap-top/${laptop.id}`} tag={Link}>
                        <Card>
                          <div className="image-size">
                            <CardImg top width="100%" src={laptop.imageUrl} alt="Card image cap"/>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5">{laptop.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Mã sản phẩm: TGSN20
                            </CardSubtitle>
                            <CardText className="">
                              <span className="price-old "><h6 className="text-secondary">{laptop.price.toLocaleString()}</h6></span>
                              <span className="price-new text-primary size-xl"><h4>{laptop.salePrice.toLocaleString()}</h4></span>
                              <span>
                                <Badge color="warning">-{laptop.percentSale.toFixed(0)}%</Badge>
                              </span>
                            </CardText>
                            <Button color="primary" className="btn-block d-none d-sm-none d-md-none d-lg-block d-xl-block">
                              XEM THÊM CHI TIẾT
                            </Button>
                          </CardBody>
                        </Card>
                      </NavLink>
                    </div>
                  ))
                  : null}
              </div>
              <div
                className="d-flex d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex justify-content-end mt-2">
                <NavLink to="/page/lap-top" tag={Link}>
                  <Badge color="primary" className="p-3">
                    XEM THÊM NHIỀU SẢN PHẨM
                  </Badge>
                </NavLink>
              </div>
            </div>
          </div>
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <NavLink to="/page/may-console" tag={Link}>
              <h2>MÁY CONSOLE</h2>
            </NavLink>
          </header>
          <hr/>
          <div className="section-content d-flex">
            <div
              className="section-banner d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-3 col-lg-3 col-xl-3">
              <NavLink to="/may-console" tag={Link}>
                <img className="img-fluid" src="content/images/do_go_noi_that_1.png" alt="banner"/>
              </NavLink>
            </div>
            <div className="section-main col-12col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <div className="row d-flex">
                {consoles && consoles.length > 0
                  ? consoles.map(console => (
                    <div className="section-product col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-2"
                      key={console.uuid}>
                      <NavLink to={`/page/may-console/${console.id}`} tag={Link}>
                        <Card>
                          <div className="image-size">
                            <CardImg top width="100%" src={console.imageUrl} alt="Card image cap"/>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5">{console.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Mã sản phẩm: TGSN20
                            </CardSubtitle>
                            <CardText className="d-xl-flex justify-content-between">
                              <span className="price-new">{console.salePrice.toLocaleString()}</span>
                              <span className="price-old">{console.price.toLocaleString()}</span>
                              <span>
                                <Badge color="warning">-{console.percentSale.toFixed(0)}%</Badge>
                              </span>
                            </CardText>
                            <Button color="primary"
                              className="btn-block d-none d-sm-none d-md-none d-lg-block d-xl-block">
                              XEM THÊM CHI TIẾT
                            </Button>
                          </CardBody>
                        </Card>
                      </NavLink>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
          <div
            className="d-flex d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex justify-content-end mt-2">
            <NavLink to="/page/may-console" tag={Link}>
              <Badge color="primary" className="p-3">
                XEM THÊM NHIỀU SẢN PHẨM
              </Badge>
            </NavLink>
          </div>
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <NavLink to="/page/macbook" tag={Link}>
              <h2>MACBOOK</h2>
            </NavLink>
          </header>
          <hr/>
          <div className="section-content d-flex">
            <div
              className="section-banner d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-3 col-lg-3 col-xl-3">
              <NavLink to="/macbook" tag={Link}>
                <img className="img-fluid" src="content/images/do_go_noi_that_1.png" alt="banner"/>
              </NavLink>
            </div>
            <div className="section-main col-12col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <div className="row d-flex">
                {macbooks && macbooks.length > 0
                  ? macbooks.map(macbook => (
                    <div className="section-product col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-2"
                      key={macbook.uuid}>
                      <NavLink to={`/page/macbook/${macbook.id}`} tag={Link}>
                        <Card>
                          <div className="image-size">
                            <CardImg top width="100%" src={macbook.imageUrl} alt="Card image cap"/>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5">{macbook.title.substring(0, 20)}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Mã sản phẩm: TGSN20
                            </CardSubtitle>
                            <CardText className="d-xl-flex justify-content-between">
                              <span className="price-new">{macbook.salePrice.toLocaleString()}</span>
                              <span className="price-old">{macbook.price.toLocaleString()}</span>
                              <span>
                                <Badge color="warning">-{macbook.percentSale.toFixed(0)}%</Badge>
                              </span>
                            </CardText>
                            <Button color="primary"
                              className="btn-block d-none d-sm-none d-md-none d-lg-block d-xl-block">
                              XEM THÊM CHI TIẾT
                            </Button>
                          </CardBody>
                        </Card>
                      </NavLink>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
          <div
            className="d-flex d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex justify-content-end mt-2">
            <NavLink to="/page/macbook" tag={Link}>
              <Badge color="primary" className="p-3">
                XEM THÊM NHIỀU SẢN PHẨM
              </Badge>
            </NavLink>
          </div>
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <NavLink to="/page/thiet-bi-choi-game" tag={Link}>
              <h2>THIẾT BỊ CHƠI GAME</h2>
            </NavLink>
          </header>
          <hr/>
          <div className="section-content d-flex">
            <div
              className="section-banner d-none d-sm-none d-md-block d-lg-block d-xl-block col-md-3 col-lg-3 col-xl-3">
              <NavLink to="/may-tinh-bang" tag={Link}>
                <img className="img-fluid" src="content/images/do_go_noi_that_1.png" alt="banner"/>
              </NavLink>
            </div>
            <div className="section-main col-12col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <div className="row d-flex">
                {gameEquipments && gameEquipments.length > 0
                  ? gameEquipments.map(gameEquipment => (
                    <div className="section-product col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-2"
                      key={gameEquipment.uuid}>
                      <NavLink to={`/page/thiet-bi-choi-game/${gameEquipment.id}`} tag={Link}>
                        <Card>
                          <div className="image-size">
                            <CardImg top width="100%" src={gameEquipment.imageUrl} alt="Card image cap"/>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5">{gameEquipment.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Mã sản phẩm: TGSN20
                            </CardSubtitle>
                            <CardText className="d-xl-flex justify-content-between">
                              <span className="price-new">{gameEquipment.salePrice.toLocaleString()}</span>
                              <span className="price-old">{gameEquipment.price.toLocaleString()}</span>
                              <span>
                                <Badge color="warning">-{gameEquipment.percentSale.toFixed(0)}%</Badge>
                              </span>
                            </CardText>
                            <Button color="primary"
                              className="btn-block d-none d-sm-none d-md-none d-lg-block d-xl-block">
                              XEM THÊM CHI TIẾT
                            </Button>
                          </CardBody>
                        </Card>
                      </NavLink>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
          <div
            className="d-flex d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex justify-content-end mt-2">
            <NavLink to="/page/thiet-bi-choi-game" tag={Link}>
              <Badge color="primary" className="p-3">
                XEM THÊM NHIỀU SẢN PHẨM
              </Badge>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
