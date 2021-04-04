import './visible.scss';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Button, InputGroup} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {getSortState} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities, getSearchVisibleEntities, reset, searchReset} from 'app/entities/simple-post/simple-post.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';

import {getEntities as getTypePostFilters} from 'app/entities/type-post-filter/type-post-filter.reducer';
import {FileApi} from "open-api/index";

export interface ISimplePostProps extends StateProps, DispatchProps
{
}

export const VisibleSearch = (props: ISimplePostProps) =>
{
  //cái danh sách sắp xếp
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [search, setSearch] = useState('');
  const [statusGetSuccess, setStatusGetSuccess] = useState(false);
  // const [paginationState, setPaginationState] = useState(
  //   overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  // );


  const {getSuccess} = props;
  // const [sorting, setSorting] = useState(false);
  useEffect(() =>
  {
    setStatusGetSuccess(getSuccess);
  }, [getSuccess]);


  // const getAllEntities = () =>
  // {
  //   if (search)
  //   {
  //     props.getSearchVisibleEntities(
  //       search
  //     );
  //   }
  //   // else {
  //   //   props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  //   // }
  // };

  useEffect(() =>
  {

    const a: FileApi = new FileApi();


    a.getFileDataByName("3213232312").then(res => window.console.log(res));

    // props.getTypePostFilters();
  }, []);

  const resetAll = () =>
  {
    props.reset();
    // props.getEntities();
  };

  useEffect(() =>
  {
    resetAll();
  }, []);

  //sử dụng để đưa giá trị mặc định của sort về ''
  window.console.log(search)
  const startSearching = () =>
  {
    if (search)
    {
      props.reset();
      props.getSearchVisibleEntities(search)
    }
  };

  const clear = () =>
  {
    props.reset();
    setSearch('');
    // props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() =>
  {
    if (props.updateSuccess)
    {
      resetAll();
    }
  }, [props.updateSuccess]);

  window.console.log(getSuccess);
  useEffect(() =>
  {
    if (getSuccess === true)
    {
      props.searchReset();
    }
  }, [getSuccess]);
  if (getSuccess === true) return <Redirect to="/result-search"/>;
  return (
    <div className=" d-flex justify-content-center col-12 col-sm-11 -col-md-10 col-lg-9 col-xl-8">
      <div className="col-12" style={{margin: 'auto'}}>
        <AvForm onSubmit={startSearching}>
          <AvGroup className="search-elastic">
            <InputGroup>
              <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm"/>
              <Button className="input-group-addon">
                <FontAwesomeIcon icon="search"/>
              </Button>
              {/*<Button type="reset" className="input-group-addon" onClick={clear}>*/}
              {/*  <FontAwesomeIcon icon="trash" />*/}
              {/*</Button>*/}
            </InputGroup>
          </AvGroup>
        </AvForm>
      </div>
    </div>
  );
};
const mapStateToProps = (storeState: IRootState) => ({
  simplePostList: storeState.simplePost.entities,
  typePostFilters: storeState.typePostFilter.entities,
  loading: storeState.simplePost.loading,
  totalItems: storeState.simplePost.totalItems,
  links: storeState.simplePost.links,
  entity: storeState.simplePost.entity,
  getSuccess: storeState.simplePost.getSuccess,
  updateSuccess: storeState.simplePost.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
  getTypePostFilters,
  searchReset,
  getSearchVisibleEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisibleSearch);
