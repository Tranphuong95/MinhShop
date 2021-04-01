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

import {defaultValue, IFile} from 'app/shared/model/file.model';

export const ACTION_TYPES = {
  SEARCH_FILES: 'file/SEARCH_FILES',
  FETCH_FILE_LIST: 'file/FETCH_FILE_LIST',
  FETCH_FILE: 'file/FETCH_FILE',
  CREATE_FILE: 'file/CREATE_FILE',
  UPDATE_FILE: 'file/UPDATE_FILE',
  PARTIAL_UPDATE_FILE: 'file/PARTIAL_UPDATE_FILE',
  DELETE_FILE: 'file/DELETE_FILE',
  SET_BLOB: 'file/SET_BLOB',
  RESET: 'file/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFile>,
  entity: defaultValue,
  links: {next: 0},
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FileState = Readonly<typeof initialState>;

// Reducer

export default (state: FileState = initialState, action): FileState =>
{
  switch (action.type)
  {
    case REQUEST(ACTION_TYPES.SEARCH_FILES):
    case REQUEST(ACTION_TYPES.FETCH_FILE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FILE):
    case REQUEST(ACTION_TYPES.UPDATE_FILE):
    case REQUEST(ACTION_TYPES.DELETE_FILE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_FILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_FILES):
    case FAILURE(ACTION_TYPES.FETCH_FILE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILE):
    case FAILURE(ACTION_TYPES.CREATE_FILE):
    case FAILURE(ACTION_TYPES.UPDATE_FILE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_FILE):
    case FAILURE(ACTION_TYPES.DELETE_FILE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FILES):
    case SUCCESS(ACTION_TYPES.FETCH_FILE_LIST):
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
    case SUCCESS(ACTION_TYPES.FETCH_FILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILE):
    case SUCCESS(ACTION_TYPES.UPDATE_FILE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_FILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILE):
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
    default:
      return state;
  }
};

const apiUrl = 'api/files';
const apiSearchUrl = 'api/_search/files';

// Actions

export const getSearchEntities: ICrudSearchAction<IFile> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_FILES,
  payload: axios.get<IFile>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IFile> = (page, size, sort) =>
{
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FILE_LIST,
    payload: axios.get<IFile>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFile> = id =>
{
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILE,
    payload: axios.get<IFile>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFile> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IFile> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IFile> = entity => async dispatch =>
{
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_FILE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFile> = id => async dispatch =>
{
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILE,
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
