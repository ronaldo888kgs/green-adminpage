import { createContext, Dispatch, SetStateAction } from 'react';

export interface IUser {
  authenticated: boolean,
  email: string,
  phone: string,
  private_key: string,
  public_key: string,
  paypal: string
}

export interface IDrawer {
  isOpening: boolean
}

export interface AppContextProperties {
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>,
  isOpenDrawer: boolean,
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProperties>({ 
  user: {
      authenticated: false,
      email: undefined,
      phone: undefined,
      private_key: undefined,
      public_key: undefined,
      paypal: undefined
  }, 
  setUser: () => {},
  isOpenDrawer: false,
  setIsOpenDrawer: () => {}
});

export { AppContext };