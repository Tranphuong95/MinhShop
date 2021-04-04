import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, InputGroup, Row, Table} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities} from './post.reducer';

export interface IPostProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }>
{
}

export const Post = (props: IPostProps) =>
{
  const [search, setSearch] = useState('');

  useEffect(() =>
  {
    props.getEntities();
  }, []);

  const startSearching = () =>
  {
    if (search)
    {
      props.getSearchEntities(search);
    }
  };

  const clear = () =>
  {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const handleSyncList = () =>
  {
    props.getEntities();
  };

  const {postList, match, loading} = props;

  return (
    <div>
      <h2 id="post-heading" data-cy="PostHeading">
        <Translate contentKey="minhShopApp.post.home.title">Posts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
            <Translate contentKey="minhShopApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="minhShopApp.post.home.createLabel">Create new Post</Translate>
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
                  placeholder={translate('minhShopApp.post.home.search')}
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
        {postList && postList.length > 0 && typeof postList === 'object' ? (
          <Table responsive>
            <thead>
            <tr>
              <th>
                <Translate contentKey="global.field.id">ID</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.title">Title</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.price">Price</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.salePrice">Sale Price</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.percentSale">Percent Sale</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.imageUrl">Image Url</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.scores">Scores</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.simpleContent">Simple Content</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.otherInfo">Other Info</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.postDetailsId">Post Details Id</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.content">Content</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.role">Role</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.createdBy">Created By</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.modifiedBy">Modified By</Translate>
              </th>
              <th>
                <Translate contentKey="minhShopApp.post.comment">Comment</Translate>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {postList.map((post, i) => (
              <tr key={`entity-${i * 101}`} data-cy="entityTable">
                <td>
                  <Button tag={Link} to={`${match.url}/${post.id}`} color="link" size="sm">
                    {post.id}
                  </Button>
                </td>
                <td>{post.title}</td>
                <td>{post.price}</td>
                <td>{post.salePrice}</td>
                <td>{post.percentSale}</td>
                <td>{post.imageUrl}</td>
                <td>{post.scores}</td>
                <td>{post.simpleContent}</td>
                <td>{post.otherInfo}</td>
                <td>{post.postDetailsId}</td>
                <td>{post.content}</td>
                <td>{post.role}</td>
                <td>{post.createdBy}</td>
                <td>{post.modifiedBy}</td>
                <td>{post.comment}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.view">View</Translate>
                      </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${post.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${post.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="minhShopApp.post.home.notFound">No Posts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({post}: IRootState) => ({
  postList: post.entities,
  loading: post.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Post);
