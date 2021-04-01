import './visible.scss';

import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faListAlt} from '@fortawesome/free-solid-svg-icons';
import {NavLink, withRouter} from 'react-router-dom';
import {WarpCart} from 'app/shared/layout/visible/visible-component';
import VisibleSearch from 'app/shared/layout/visible/visibleSearch';

export function useComponentVisible(initialIsVisible)
{
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) =>
  {
    if (event.key === 'Escape')
    {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event =>
  {
    if (ref.current && !ref.current.contains(event.target))
    {
      setIsComponentVisible(false);
    }
    window.console.log(ref.current.contains(event.target));
  };

  useEffect(() =>
  {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () =>
    {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return {ref, isComponentVisible, setIsComponentVisible};
}

const Visible = props =>
{
  const {
    history,
    location: {pathname},
  } = props;
  window.console.log(pathname);

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

  function myFunction()
  {
    document.getElementById('menu-page-hidden').classList.toggle('show');
    setIsComponentVisible(true);
  }

  window.onclick = function ()
  {
    if (!isComponentVisible)
    {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i++)
      {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show'))
        {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  return (
    <div>
      {/*{pathname==="/"?                        //todo add test display visible if pathname==='/'*/}
      {/*  (*/}
      <div className="visible d-flex justify-content-center">
        <div className="visible-container d-flex bg-main-color  col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-9">
          <div className="visible-list  d-none d-sm-none d-md-none d-lg-none d-xl-block d-xl-flex flex-wrap align-content-center  col-lg-3 col-xl-3">
            <div onClick={myFunction} className="menu-laptop-header d-flex" ref={ref}>
              <div className="visible-icon mr-2 d-none d-sm-none d-md-none d-lg-none d-xl-block">
                <FontAwesomeIcon icon={faListAlt}/>
              </div>
              <div>DANH MỤC SẢN PHẨM</div>
            </div>
            <div id="menu-page-hidden" className="dropdown-content">
              <NavLink
                to="/page/may-tinh-bang"
                className="list-group-item-action list-group-item"
                activeStyle={{backgroundColor: '#dd5600'}}
              >
                <span>MÁY TÍNH BẢNG</span>
              </NavLink>
              <NavLink to="/page/lap-top" className="list-group-item-action list-group-item" activeStyle={{backgroundColor: '#dd5600'}}>
                <span>LAPTOP</span>
              </NavLink>
              <NavLink
                to="/page/may-console"
                className="list-group-item-action list-group-item"
                activeStyle={{backgroundColor: '#dd5600'}}
              >
                <span>MÁY CONSOLE</span>
              </NavLink>
              <NavLink to="/page/macbook" className="list-group-item-action list-group-item" activeStyle={{backgroundColor: '#dd5600'}}>
                <span>MACBOOK</span>
              </NavLink>
              <NavLink
                to="/page/thiet-bi-choi-game"
                className="list-group-item-action list-group-item"
                activeStyle={{backgroundColor: '#dd5600'}}
              >
                <span>THIẾT BỊ CHƠI GAME</span>
              </NavLink>
            </div>
          </div>
          <div className="search-target d-flex flex-wrap align-content-center ">
            {/*<div className="input-group d-block d-sm-block d-md-none d-lg-none d-xl-none">*/}
            {/*  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />*/}
            {/*</div>*/}
            {/*<VisibleListSearch />*/}
            <VisibleSearch/>
            <WarpCart/>
          </div>
        </div>
      </div>
      {/*):""}*/}
    </div>
  );
};

export default withRouter(Visible);
