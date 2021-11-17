import { useReactiveVar } from '@apollo/client'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'
import Navbar from '../components/shared/layout/header/Navbar';
import { getFeatureToggleByChainId } from '../featureToggle'
import { ThemeProviderEnum, themeVar } from '../graphql/variables/Shared'
import { chainIdVar } from '../graphql/variables/WalletVariable'
import { Page404 } from '../pages/Page404'
import {AppContext} from '../contexts';
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import UsersPage from '../pages/UsersPage';
import CollectionsPage from '../pages/CollectionsPage';
import ItemsPage from '../pages/ItemsPage';
import CategoriesPage from '../pages/CategoriesPage';
import ActivitiesPage from '../pages/ActivitiesPage';
import OffersPage from '../pages/OffersPage';
import SettingsPage from '../pages/SettingsPage';
import { Footer } from '../components/shared/layout/footer/Footer'
import { exist } from '../services/UserService';
import ProfilePage from '../pages/ProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import CollectionDetail from '../pages/CollectionDetail';

export default function Routes() {
  const chainId = useReactiveVar(chainIdVar)
  const theme = useReactiveVar(themeVar)
  const featureToggle = getFeatureToggleByChainId(chainId)
  const location = useLocation()

  useEffect(() => {
    const setTheme = (search: string) => {
      if (search.includes('theme=dark')) {
        themeVar(ThemeProviderEnum.dark)
      } else {
        themeVar(ThemeProviderEnum.light)
      }
    }

    setTheme(location.search)
  }, [location, theme])

  const [user, setUser] = useState({
    authenticated: false, 
    email: "", 
    phone: "", 
    private_key: "",
    public_key: "",
    paypal: ""
  });

  const [isExistAdmin, setIsExistAdmin] = useState(false);
  useEffect(()=>{
    getExist()
    if(user.authenticated) return;
    const cookies = new Cookies();
    if(cookies.get('token')){
      let userdata = jwt(cookies.get('token'));
      setUser({
        authenticated: true,
        email: userdata["email"],
        phone: userdata["phone"],
        private_key: userdata["private_key"],
        public_key: userdata["public_key"],
        paypal: userdata["paypal"]
      })
    }
  })

  const getExist = async () => {
    const count = await exist();
    if(count > 0)
      setIsExistAdmin(true);
  }

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (    
    <>    
      <AppContext.Provider value={{user, setUser, isOpenDrawer, setIsOpenDrawer}}>
        {user.authenticated&& <Navbar />}
        <Switch>
          {user.authenticated? 
            <Route path='/' exact component={UsersPage} />
            :
            isExistAdmin? <Route path='/' exact component={LoginPage} /> : <Route path='/' exact component={SignupPage} />
          }       
          <Route path='/collections' exact component={CollectionsPage} />      
          <Route path='/items' exact component={ItemsPage} />      
          <Route path='/categories' exact component={CategoriesPage} />
          <Route path='/activities' exact component={ActivitiesPage} />
          <Route path='/offers' exact component={OffersPage} />
          <Route path='/settings' exact component={SettingsPage} />
          <Route path='/forgotpassword' exact component={ForgotPasswordPage} />
          <Route path='/profile' exact component={ProfilePage} />
          <Route path='/changepassword' exact component={ChangePasswordPage} />
          <Route path='/collection/detail' exact component={CollectionDetail} />
          <Route path='**' component={Page404} />
        </Switch>
        {user.authenticated&& <Footer />}
      </AppContext.Provider>
    </>
  )
}
