import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, InputGroup, Row, Table} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {getSortState, TextFormat, Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities, reset} from './type-post.reducer';
import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';

export interface ITypePostProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }>
{
}

export const TypePost = (props: ITypePostProps) =>
{
  const [search, setSearch] = useState('');

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );
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

  const resetAll = () =>
  {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  useEffect(() =>
  {
    resetAll();

    // // test thử bên dưới
    // props.reset();
    // setPaginationState({
    //   ...paginationState,
    //   activePage: 1,
    // });

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

  const {typePostList, match, loading} = props;
  window.console.log('nextPage',props.links.next)
  window.console.log('page', paginationState.activePage-1)
  window.console.log(typePostList)
  return (
    <div>
      <h2 id="type-post-heading" data-cy="TypePostHeading">
        <Translate contentKey="minhShopApp.typePost.home.title">Type Posts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
            <Translate contentKey="minhShopApp.typePost.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="minhShopApp.typePost.home.createLabel">Create new Type Post</Translate>
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('minhShopApp.typePost.home.search')}
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
          {typePostList && typePostList.length > 0 ? (
            <Table responsive>
              <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('uuid')}>
                  <Translate contentKey="minhShopApp.typePost.uuid">Uuid</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('typeName')}>
                  <Translate contentKey="minhShopApp.typePost.typeName">Type Name</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('searchField')}>
                  <Translate contentKey="minhShopApp.typePost.searchField">Search Field</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('role')}>
                  <Translate contentKey="minhShopApp.typePost.role">Role</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="minhShopApp.typePost.createdDate">Created Date</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('modifiedDate')}>
                  <Translate contentKey="minhShopApp.typePost.modifiedDate">Modified Date</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  <Translate contentKey="minhShopApp.typePost.createdBy">Created By</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('modifiedBy')}>
                  <Translate contentKey="minhShopApp.typePost.modifiedBy">Modified By</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('dataSize')}>
                  <Translate contentKey="minhShopApp.typePost.dataSize">Data Size</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('comment')}>
                  <Translate contentKey="minhShopApp.typePost.comment">Comment</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {typePostList.map((typePost, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${typePost.id}`} color="link" size="sm">
                      {typePost.id}
                    </Button>
                  </td>
                  <td>{typePost.uuid}</td>
                  <td>{typePost.typeName}</td>
                  <td>{typePost.searchField}</td>
                  <td>{typePost.role}</td>
                  <td>
                    {typePost.createdDate ? <TextFormat type="date" value={typePost.createdDate} format={APP_DATE_FORMAT}/> : null}
                  </td>
                  <td>
                    {typePost.modifiedDate ? <TextFormat type="date" value={typePost.modifiedDate} format={APP_DATE_FORMAT}/> : null}
                  </td>
                  <td>{typePost.createdBy}</td>
                  <td>{typePost.modifiedBy}</td>
                  <td>{typePost.dataSize}</td>
                  <td>{typePost.comment}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${typePost.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${typePost.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${typePost.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="minhShopApp.typePost.home.notFound">No Type Posts found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({typePost}: IRootState) => ({
  typePostList: typePost.entities,
  loading: typePost.loading,
  totalItems: typePost.totalItems,
  links: typePost.links,
  entity: typePost.entity,
  updateSuccess: typePost.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypePost);
