import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, InputGroup, Row, Table} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {getSortState, TextFormat, Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities, reset} from './post-details.reducer';
import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

export interface IPostDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }>
{
}

export const PostDetails = (props: IPostDetailsProps) =>
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
    // props.getEntities();
  };

  useEffect(() =>
  {
    resetAll();
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

  const {postDetailsList, match, loading} = props;
  return (
    <div>
      <h2 id="post-details-heading" data-cy="PostDetailsHeading">
        <Translate contentKey="minhShopApp.postDetails.home.title">Post Details</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
            <Translate contentKey="minhShopApp.postDetails.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="minhShopApp.postDetails.home.createLabel">Create new Post Details</Translate>
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
                  placeholder={translate('minhShopApp.postDetails.home.search')}
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
          {postDetailsList && postDetailsList.length > 0 ? (
            <Table responsive>
              <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('uuid')}>
                  <Translate contentKey="minhShopApp.postDetails.uuid">Uuid</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('postDetailsId')}>
                  <Translate contentKey="minhShopApp.postDetails.postDetailsId">Post Details Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('content')}>
                  <Translate contentKey="minhShopApp.postDetails.content">Content</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('searchField')}>
                  <Translate contentKey="minhShopApp.postDetails.searchField">Search Field</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('role')}>
                  <Translate contentKey="minhShopApp.postDetails.role">Role</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="minhShopApp.postDetails.createdDate">Created Date</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('modifiedDate')}>
                  <Translate contentKey="minhShopApp.postDetails.modifiedDate">Modified Date</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  <Translate contentKey="minhShopApp.postDetails.createdBy">Created By</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('modifiedBy')}>
                  <Translate contentKey="minhShopApp.postDetails.modifiedBy">Modified By</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('dataSize')}>
                  <Translate contentKey="minhShopApp.postDetails.dataSize">Data Size</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('comment')}>
                  <Translate contentKey="minhShopApp.postDetails.comment">Comment</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onClick={sort('otherData')}>
                  <Translate contentKey="minhShopApp.postDetails.otherData">Other Data</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {postDetailsList.map((postDetails, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${postDetails.id}`} color="link" size="sm">
                      {postDetails.id}
                    </Button>
                  </td>
                  <td>{postDetails.uuid}</td>
                  <td>{postDetails.postDetailsId}</td>
                  <td>
                    <FroalaEditorView model={postDetails.content}/>
                  </td>
                  <td>{postDetails.searchField}</td>
                  <td>{postDetails.role}</td>
                  <td>
                    {postDetails.createdDate ? <TextFormat type="date" value={postDetails.createdDate} format={APP_DATE_FORMAT}/> : null}
                  </td>
                  <td>
                    {postDetails.modifiedDate ? (
                      <TextFormat type="date" value={postDetails.modifiedDate} format={APP_DATE_FORMAT}/>
                    ) : null}
                  </td>
                  <td>{postDetails.createdBy}</td>
                  <td>{postDetails.modifiedBy}</td>
                  <td>{postDetails.dataSize}</td>
                  <td>{postDetails.comment}</td>
                  <td>{postDetails.otherData}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${postDetails.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${postDetails.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${postDetails.id}/delete`}
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
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="minhShopApp.postDetails.home.notFound">No Post Details found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({postDetails}: IRootState) => ({
  postDetailsList: postDetails.entities,
  loading: postDetails.loading,
  totalItems: postDetails.totalItems,
  links: postDetails.links,
  entity: postDetails.entity,
  updateSuccess: postDetails.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
