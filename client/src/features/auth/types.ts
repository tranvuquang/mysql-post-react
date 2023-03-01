export type IUser = {
    id: number;
    username: string;
  };
  
  
  export type AuthState = {
    user: IUser;
    accessToken: string;
    loading: boolean;
  };
  
  export const userDefaultData = {
    id: 0,
    username: "",
  };
  