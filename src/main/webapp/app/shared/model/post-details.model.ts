import dayjs from 'dayjs';
import { ISimplePost } from 'app/shared/model/simple-post.model';

export interface IPostDetails {
  id?: number;
  uuid?: string;
  postDetailsId?: string;
  content?: string;
  role?: string;
  createdDate?: string;
  modifiedDate?: string;
  createdBy?: string;
  modifiedBy?: string;
  dataSize?: number | null;
  comment?: string | null;
  simplePost?: ISimplePost | null;
}

export const defaultValue: Readonly<IPostDetails> = {};