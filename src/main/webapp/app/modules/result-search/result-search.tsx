import React from 'react';
import {IRootState} from 'app/shared/reducers';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, CardImg, CardText, CardTitle, Progress} from 'reactstrap';
import {Link} from 'react-router-dom';

const ResultSearch = props =>
{
  const {simplePostList} = props;
  window.console.log(simplePostList)

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex row col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-9">
        {simplePostList && simplePostList.length > 0 ? (
          simplePostList.map(product =>
          {
            // if (product.typePost.typeName === 'product') {}
            const typePostProduct=product.typePost;
            window.console.log(typePostProduct?typePostProduct.id:'hello')
            return (
              <div className="col-4" key={product.uuid + product.id}>
                <Link to={`page/${typePostProduct?(typePostProduct.id===1051?'lap-top':typePostProduct.id===1052?'may-console':typePostProduct.id===51001?'macbook':'tablets'):''}/${product.id}`}>
                  {/*<Link to={`${match.url}/${product.id}`}>*/}
                  <Card className="p-1 p-sm-1 p-lg-0 ">
                    <CardHeader className="px-1 px-md-1 p-lg-2">
                      <div>
                        <CardImg top width="100%" src={product.imageUrl} alt="Card image cap"/>
                      </div>
                      <div className="float-group">
                        <CardTitle tag="h4" className="float-left">
                          {product.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <CardText className="d-flex">
                        <span className="">Giá gốc: </span>
                        <span className="text-secondary ml-1">
                          <del>{product.price.toLocaleString()}đ</del>
                        </span>
                        <br/>
                      </CardText>
                      <CardText className="d-flex">
                        <span className="">Chỉ còn: </span>
                        <span className=" text-danger ml-1">
                          <b>{product.salePrice.toLocaleString()}đ</b>
                        </span>
                        <span className="float-left badge badge-danger text-white ml-2">-{product.percentSale}%</span>
                        <br/>
                      </CardText>
                      <div className="text-center" style={{width: '200px'}}>
                        <Progress animated value={product.scores}>
                          {product.scores}
                        </Progress>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })
        ) : (
          <h3>Không tìm thấy kết quả phù hợp</h3>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  simplePostList: storeState.simplePost.entities,
});

export default connect(mapStateToProps, null)(ResultSearch);
