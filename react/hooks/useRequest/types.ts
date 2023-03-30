import { AxiosError } from 'axios';

export type UserRequestOption<R, V> = {
  onError?: (error: AxiosError) => void;
  onCompleted?: (data: R, variables: V) => void;
  manual?: boolean;
  variables?: V;
};
