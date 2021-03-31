import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Badge, Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import {getUsersAsAdmin, updateUser} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<any>
{
}

export const UserManagement = (props: IUserManagementProps) =>
{
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getUsersFromProps = () =>
  {
    props.getUsersAsAdmin(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL)
    {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() =>
  {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() =>
  {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sortParam = params.get('sort');
    if (page && sortParam)
    {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () =>
  {
    getUsersFromProps();
  };

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated,
    });

  const {users, account, match, totalItems, loading} = props;
  return (
    <div>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus"/> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
        <tr>
          <th className="hand" onClick={sort('id')}>
            <Translate contentKey="global.field.id">ID</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th className="hand" onClick={sort('login')}>
            <Translate contentKey="userManagement.login">Login</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th className="hand" onClick={sort('email')}>
            <Translate contentKey="userManagement.email">Email</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th/>
          <th className="hand" onClick={sort('langKey')}>
            <Translate contentKey="userManagement.langKey">Lang Key</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th>
            <Translate contentKey="userManagement.profiles">Profiles</Translate>
          </th>
          <th className="hand" onClick={sort('createdDate')}>
            <Translate contentKey="userManagement.createdDate">Created Date</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th className="hand" onClick={sort('lastModifiedBy')}>
            <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
            <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {users.map((user, i) => (
          <tr id={user.login} key={`user-${i}`}>
            <td>
              <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                {user.id}
              </Button>
            </td>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>
              {user.activated ? (
                <Button color="success" onClick={toggleActive(user)}>
                  <Translate contentKey="userManagement.activated">Activated</Translate>
                </Button>
              ) : (
                <Button color="danger" onClick={toggleActive(user)}>
                  <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                </Button>
              )}
            </td>
            <td>{user.langKey}</td>
            <td>
              {user.authorities
                ? user.authorities.map((authority, j) => (
                  <div key={`user-auth-${i}-${j}`}>
                    <Badge color="info">{authority}</Badge>
                  </div>
                ))
                : null}
            </td>
            <td>
              {user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/> : null}
            </td>
            <td>{user.lastModifiedBy}</td>
            <td>
              {user.lastModifiedDate ? (
                <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
              ) : null}
            </td>
            <td className="text-right">
              <div className="btn-group flex-btn-group-container">
                <Button tag={Link} to={`${match.url}/${user.login}`} color="info" size="sm">
                  <FontAwesomeIcon icon="eye"/>{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.view">View</Translate>
                  </span>
                </Button>
                <Button tag={Link} to={`${match.url}/${user.login}/edit`} color="primary" size="sm">
                  <FontAwesomeIcon icon="pencil-alt"/>{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
                <Button
                  tag={Link}
                  to={`${match.url}/${user.login}/delete`}
                  color="danger"
                  size="sm"
                  disabled={account.login === user.login}
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
      {props.totalItems ? (
        <div className={users && users.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled/>
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
});

const mapDispatchToProps = {getUsersAsAdmin, updateUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
