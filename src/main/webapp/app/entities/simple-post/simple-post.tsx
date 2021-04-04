import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  Progress,
  Row,
} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {getSortState, Storage, Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities, getSortTypePostEntities, reset} from './simple-post.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';

// import { getEntities as getTypePostFilters } from 'app/entities/type-post-filter/type-post-filter.reducer';
import {getEntities as getTypePosts} from 'app/entities/type-post/type-post.reducer';
import {getEntities as getPostDetails} from 'app/entities/post-details/post-details.reducer';

export interface ISimplePostProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }>
{
}

export const SimplePost = (props: ISimplePostProps) =>
{
  //cái danh sách sắp xếp
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const {simplePostList, typePost, postDetails, match, loading} = props;
  const [sorting, setSorting] = useState(false);


  const getAllEntities = () =>
  {
    if (search)
    {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
    else
    {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
  };
  
  useEffect(() =>
  {
    props.getTypePosts();
  }, []);

  useEffect(() =>
  {
    props.getPostDetails();
  }, []);
  const resetAll = () =>
  {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    // props.getEntities();
  };

  useEffect(() =>
  {
    resetAll();
  }, []);

  //sử dụng để đưa giá trị mặc định của sort về ''
  useEffect(() =>
  {
    setPaginationState({
      ...paginationState,
      sort: '',
    });
  }, []);

  const startSearching = () =>
  {
    if (search)
    {
      props.reset();
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () =>
  {
    props.reset();
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() =>
  {
    if (props.updateSuccess)
    {
      resetAll();
    }
  }, [props.updateSuccess]);

  useEffect(() =>
  {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () =>
  {
    if ((window as any).pageYOffset > 0)
    {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() =>
  {
    if (sorting)
    {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting, search]);

  const sort = p => () =>
  {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () =>
  {
    resetAll();
  };

  const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  const authToken = `Bearer ${token}`;

  const onGetFilterSimplePost = id =>
  {
    // axios({
    //   url: 'api/_search/simple-posts',
    //   method: 'get',
    //   headers: {
    //     Authorization: authToken,
    //   },
    //   // params:typeNameFil
    //   params:{size: 20, page: 0, query: `typePost.id:${id}`}
    // }).then(res => (res.data));
    // // .catch(erro=>window.console.log(erro))
    props.reset();
    props.getSortTypePostEntities(`typePost.id:${id}`, paginationState.activePage - 1, paginationState.itemsPerPage);
  };

  const showImages=(id)=>{
    let result=null;
    if(postDetails && postDetails.length>0){
      postDetails.map(item=>{
        if(item.id===id){
          if(item.otherData){
            const urls:any= item.otherData;
            const images=JSON.parse(urls);
            if(images && images.length>0){
              result=images.map(image=>{
                return(
                  <img key={image.id} width="100%" src={image.link} alt="Card image cap"/>
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
    <div className=" d-flex justify-content-center">
      <div className="col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-9">
        <h2 id="simple-post-heading" data-cy="SimplePostHeading">
          <Translate contentKey="minhShopApp.simplePost.home.title">Simple Posts</Translate>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
              <Translate contentKey="minhShopApp.simplePost.home.refreshListLabel">Refresh List</Translate>
            </Button>
            <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus"/>
              &nbsp;
              <Translate contentKey="minhShopApp.simplePost.home.createLabel">Create new Simple Post</Translate>
            </Link>
          </div>
        </h2>
        <Row>
          <Col sm="12" className="p-0">
            <AvForm onSubmit={startSearching}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder={translate('minhShopApp.simplePost.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search"/>
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={clear}>
                    <FontAwesomeIcon icon="trash"/>
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={paginationState.activePage}
            loadMore={handleLoadMore}
            hasMore={paginationState.activePage - 1 < props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {simplePostList && simplePostList.length > 0 ? (
              <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>Sắp xếp theo</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="hand" onClick={sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('uuid')}>
                      <Translate contentKey="minhShopApp.simplePost.uuid">Uuid</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('title')}>
                      <Translate contentKey="minhShopApp.simplePost.title">Title</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('price')}>
                      <Translate contentKey="minhShopApp.simplePost.price">Price</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('salePrice')}>
                      <Translate contentKey="minhShopApp.simplePost.salePrice">Sale Price</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('percentSale')}>
                      <Translate contentKey="minhShopApp.simplePost.percentSale">Percent Sale</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('imageUrl')}>
                      <Translate contentKey="minhShopApp.simplePost.imageUrl">Image Url</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('scores')}>
                      <Translate contentKey="minhShopApp.simplePost.scores">Scores</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('simpleContent')}>
                      <Translate contentKey="minhShopApp.simplePost.simpleContent">Simple Content</Translate>{' '}
                      <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('otherInfo')}>
                      <Translate contentKey="minhShopApp.simplePost.otherInfo">Other Info</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('role')}>
                      <Translate contentKey="minhShopApp.simplePost.role">Role</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('createdDate')}>
                      <Translate contentKey="minhShopApp.simplePost.createdDate">Created Date</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('modifiedDate')}>
                      <Translate contentKey="minhShopApp.simplePost.modifiedDate">Modified Date</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('createdBy')}>
                      <Translate contentKey="minhShopApp.simplePost.createdBy">Created By</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('modifiedBy')}>
                      <Translate contentKey="minhShopApp.simplePost.modifiedBy">Modified By</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('dataSize')}>
                      <Translate contentKey="minhShopApp.simplePost.dataSize">Data Size</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem className="hand" onClick={sort('comment')}>
                      <Translate contentKey="minhShopApp.simplePost.comment">Comment</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="minhShopApp.simplePost.postDetails">Post Details</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="minhShopApp.simplePost.typePost">Type Post</Translate> <FontAwesomeIcon icon="sort"/>
                    </DropdownItem>
                    <th className="hand" onClick={sort('searchField')}>
                      <Translate contentKey="minhShopApp.simplePost.searchField">Search Field</Translate> <FontAwesomeIcon icon="sort"/>
                    </th>
                  </DropdownMenu>
                </Dropdown>
                <div className="d-flex justify-content-between">
                  <div className="col-9 row d-flex">
                    {simplePostList.map((simplePost, i) => (
                      <div
                        key={`entity-${i}`}
                        data-cy="entityTable"
                        className="col-12 col-sm-9 col-md-6 col-lg-6 col-xl-6  px-0 p-md-1 p-lg-2"
                      >
                        <div className="">
                          <Card className="p-1 p-sm-1 p-lg-0">
                            <CardHeader className="px-1 px-md-1 p-lg-2">
                              <div className="float-group">
                                <CardTitle tag="h4" className="float-left">
                                  {simplePost.title}
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted float-right pt-2">
                                  {' '}
                                  <i>mã: </i>
                                  {simplePost.postDetails ? (
                                    <Link to={`post-details/${simplePost.postDetails.id}`}>{simplePost.postDetails.postDetailsId}</Link>
                                  ) : (
                                    ''
                                  )}
                                </CardSubtitle>
                              </div>
                              <div>

                                <CardImg top width="100%" src={simplePost.imageUrl} alt="Card image cap"/>
                                {showImages(simplePost.postDetails.id)}
                              </div>
                            </CardHeader>
                            <CardBody>
                              <CardText className="">
                                <p className="float-left">Giá gốc: </p>
                                <div className="float-left text-secondary">
                                  <del>{simplePost.price}đ</del>
                                </div>
                                <br/>
                              </CardText>
                              <CardText className="">
                                <p className="float-left">Chỉ còn: </p>
                                <div className="float-left text-danger">
                                  <b>{simplePost.salePrice}đ</b>
                                </div>
                                <div className="float-left badge badge-danger text-white">-{simplePost.percentSale}%</div>
                                <br/>
                              </CardText>
                              <div className="text-center" style={{width: '200px'}}>
                                <Progress animated value={simplePost.scores}>
                                  {simplePost.scores}
                                </Progress>
                              </div>
                              <CardText>{simplePost.simpleContent}</CardText>
                              <CardText>{simplePost.otherInfo}</CardText>
                              <CardText>{simplePost.comment}</CardText>
                              <div>
                                {simplePost.typePost ? (
                                  <Link to={`type-post/${simplePost.typePost.id}`}>{simplePost.typePost.typeName}</Link>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                  <Button
                                    tag={Link}
                                    to={`${match.url}/${simplePost.id}`}
                                    color="info"
                                    size="sm"
                                    data-cy="entityDetailsButton"
                                  >
                                    <FontAwesomeIcon icon="eye"/>{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.view">View</Translate>
                                    </span>
                                  </Button>
                                  <Button
                                    tag={Link}
                                    to={`${match.url}/${simplePost.id}/edit`}
                                    color="primary"
                                    size="sm"
                                    data-cy="entityEditButton"
                                  >
                                    <FontAwesomeIcon icon="pencil-alt"/>{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.edit">Edit</Translate>
                                    </span>
                                  </Button>
                                  <Button
                                    tag={Link}
                                    to={`${match.url}/${simplePost.id}/delete`}
                                    color="danger"
                                    size="sm"
                                    data-cy="entityDeleteButton"
                                  >
                                    <FontAwesomeIcon icon="trash"/>{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.delete">Delete</Translate>
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        <div></div>
                      </div>
                    ))}
                  </div>
                  <div className="list-sort col-3">
                    <div className="d-flex justify-content-center">
                      <h5>Chọn danh mục</h5>
                    </div>
                    <Input className="btn-primary mb-2 color-white" type="button" value="XEM TẤT CẢ" onClick={clear}/>
                    {typePost && typePost.length > 0
                      ? typePost.map((item, i) => (
                        <Input
                          className="btn-success mb-2 color-white"
                          key={`key-${item.id}`}
                          type="button"
                          value={item.typeName}
                          onClick={() => onGetFilterSimplePost(item.id)}
                        />
                      ))
                      : null}
                  </div>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="alert alert-warning">
                  <Translate contentKey="minhShopApp.simplePost.home.notFound">No Simple Posts found</Translate>
                </div>
              )
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  simplePostList: storeState.simplePost.entities,
  typePost: storeState.typePost.entities,
  typePostFilters: storeState.typePostFilter.entities,
  postDetails: storeState.postDetails.entities,
  loading: storeState.simplePost.loading,
  totalItems: storeState.simplePost.totalItems,
  links: storeState.simplePost.links,
  entity: storeState.simplePost.entity,
  updateSuccess: storeState.simplePost.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
  getTypePosts,
  getSortTypePostEntities,
  getPostDetails
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SimplePost);
