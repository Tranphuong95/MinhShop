import axios from 'axios';
import {
  ICrudDeleteAction,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudSearchAction,
  loadMoreDataWhenScrolled,
  parseHeaderForLinks,
} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, ISimplePost} from 'app/shared/model/simple-post.model';

export const ACTION_TYPES = {
  SEARCH_SIMPLEPOSTS: 'simplePost/SEARCH_SIMPLEPOSTS',
  FETCH_SIMPLEPOST_LIST: 'simplePost/FETCH_SIMPLEPOST_LIST',
  FETCH_SIMPLEPOST: 'simplePost/FETCH_SIMPLEPOST',
  CREATE_SIMPLEPOST: 'simplePost/CREATE_SIMPLEPOST',
  UPDATE_SIMPLEPOST: 'simplePost/UPDATE_SIMPLEPOST',
  PARTIAL_UPDATE_SIMPLEPOST: 'simplePost/PARTIAL_UPDATE_SIMPLEPOST',
  DELETE_SIMPLEPOST: 'simplePost/DELETE_SIMPLEPOST',
  SET_BLOB: 'simplePost/SET_BLOB',
  RESET: 'simplePost/RESET',
  SEARCH_RESET: 'simplePost/SEARCH_RESET',
  SORT_SIMPLEPOST: 'simplePost/SORT_SIMPLEPOST', //todo add 19/2
  SEARCH_VISIBLE: 'simplePost/SEARCH_VISIBLE', //todo add 23/2
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISimplePost>,
  entity: defaultValue,
  links: {next: 0},
  updating: false,
  getSuccess: false, //test thử
  totalItems: 0,
  updateSuccess: false,
};

export type SimplePostState = Readonly<typeof initialState>;

// Reducer

export default (state: SimplePostState = initialState, action): SimplePostState =>
{
  switch (action.type)
  {
    case REQUEST(ACTION_TYPES.SEARCH_SIMPLEPOSTS):
    case REQUEST(ACTION_TYPES.FETCH_SIMPLEPOST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SIMPLEPOST):
    case REQUEST(ACTION_TYPES.SORT_SIMPLEPOST):
    case REQUEST(ACTION_TYPES.SEARCH_VISIBLE):
      return {
        ...state,
        errorMessage: null,
        getSuccess: false,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SIMPLEPOST):
    case REQUEST(ACTION_TYPES.UPDATE_SIMPLEPOST):
    case REQUEST(ACTION_TYPES.DELETE_SIMPLEPOST):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SIMPLEPOST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_SIMPLEPOSTS):
    case FAILURE(ACTION_TYPES.FETCH_SIMPLEPOST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.CREATE_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.UPDATE_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.DELETE_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.SORT_SIMPLEPOST):
    case FAILURE(ACTION_TYPES.SEARCH_VISIBLE):
      return {
        ...state,
        loading: false,
        updating: false,
        getSuccess: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_VISIBLE):
    {
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        loading: false,
        links,
        getSuccess: true,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.SORT_SIMPLEPOST):
    case SUCCESS(ACTION_TYPES.SEARCH_SIMPLEPOSTS):
    case SUCCESS(ACTION_TYPES.FETCH_SIMPLEPOST_LIST):
    {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_SIMPLEPOST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SIMPLEPOST):
    case SUCCESS(ACTION_TYPES.UPDATE_SIMPLEPOST):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SIMPLEPOST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SIMPLEPOST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB:
    {
      const {name, data, contentType} = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case ACTION_TYPES.SEARCH_RESET:
      return {
        ...state,
        getSuccess: false,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/simple-posts';
const apiSearchUrl = 'api/_search/simple-posts';

// Actions

export const getSearchEntities: ICrudSearchAction<ISimplePost> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SIMPLEPOSTS,
  payload: axios.get<ISimplePost>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});
export const getSortTypePostEntities: ICrudSearchAction<ISimplePost> = (query, page, size, sort) => ({
  //todo add 19/2
  type: ACTION_TYPES.SORT_SIMPLEPOST,
  payload: axios.get<ISimplePost>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});
export const getSearchVisibleEntities: ICrudSearchAction<ISimplePost> = (query) => ({
  //todo add 23/2
  type: ACTION_TYPES.SEARCH_VISIBLE,
  payload: axios.get<ISimplePost>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<ISimplePost> = (page, size, sort) =>
{
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SIMPLEPOST_LIST,
    payload: axios.get<ISimplePost>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISimplePost> = id =>
{
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SIMPLEPOST,
    payload: axios.get<ISimplePost>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISimplePost> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SIMPLEPOST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISimplePost> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SIMPLEPOST,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISimplePost> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SIMPLEPOST,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISimplePost> = id => async dispatch =>
{
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SIMPLEPOST,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
export const searchReset = () => ({
  type: ACTION_TYPES.SEARCH_RESET,
});
