import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/post-details">
      <Translate contentKey="global.menu.entities.postDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/simple-post">
      <Translate contentKey="global.menu.entities.simplePost" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/type-post">
      <Translate contentKey="global.menu.entities.typePost" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/type-post-filter">
      <Translate contentKey="global.menu.entities.typePostFilter" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/image">
      <Translate contentKey="global.menu.entities.image" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/file">
      <Translate contentKey="global.menu.entities.file" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payment">
      <Translate contentKey="global.menu.entities.payment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bill">
      <Translate contentKey="global.menu.entities.bill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-other-info">
      <Translate contentKey="global.menu.entities.userOtherInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/hanh-chinh-vn">
      <Translate contentKey="global.menu.entities.hanhChinhVn" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
