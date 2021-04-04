import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SimplePost from './simple-post';
import SimplePostDetail from './simple-post-detail';
import SimplePostUpdate from './simple-post-update';
import SimplePostDeleteDialog from './simple-post-delete-dialog';

const Routes = ({match}) => {
  window.console.log(match)
  return(
    <>
      <Switch>
        <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SimplePostUpdate}/>
        <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SimplePostUpdate}/>
        <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SimplePostDetail}/>
        <ErrorBoundaryRoute path={match.url} component={SimplePost}/>
      </Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SimplePostDeleteDialog}/>
    </>
  );
}

export default Routes;
