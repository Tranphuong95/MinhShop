import React from 'react';
import {BreadcrumbItem, NavLink} from 'reactstrap';

const base_path = '/';
const CrumbItem = ({to, glyph, ...props}) =>
{

  return (
    <NavLink to={to}>
      <BreadcrumbItem {...props}></BreadcrumbItem>
    </NavLink>
  );
};

export default CrumbItem;
