import React, {useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  SvgIcon
} from "@material-ui/core";
import { NavLink, Link, useHistory } from "react-router-dom";
import DrawerComponent from "./Drawer";
import nftIcon from '../../../../assets/logo.png'//nft-logo.png'
import { AppContext } from '../../../../contexts'
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "row",
    WebkitBoxAlign: "center",
    alignItems: "center",
    overflow: "auto hidden",
    WebkitBoxFlex: 1,
    flexGrow: 1,
    justifyContent: "space-around",
    marginRight: "20px"
  },
  logo: {
    display: "flex",
    cursor: "pointer",
    marginTop: "40px"
  },
  link: {
    cursor: "pointer",
    display: "flex",
    WebkitBoxAlign: "center",
    alignItems: "center",
    height: "64px",
    padding: "0px 16px",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "rgb(255, 255, 255)",
    boxShadow: "none",
    borderBottom: "none",
    flexShrink: 0,
    textDecoration: "none"
  },
  totallabel: {
    textDecoration: "none",
    color: "white",
    fontSize: "12px",
    width: "140px",
    marginLeft: theme.spacing(8),
    marginTop: "-10px",
    fontWeight: "bold"
  },
  totalvalue: {
    color: "white",
    backgroundColor: "rgb(58, 58, 58)",
    borderRadius: "5px",
    padding: "3px 0 2px 5px",
    animation: `$wAFEO 2000ms 0s infinite ${theme.transitions.easing.easeOut}`
  },
  "@keyframes wAFEO": {
    "0%": {
      opacity: 1
    },
    "50%": {
      opacity: 0.4
    },
    "100%": {
      opacity: 1
    }
  },
  icon: {
    color: "white",
    marginLeft: theme.spacing(2),
    textDecoration: "none !important"
  },
  btn: {
    WebkitBoxAlign: "center",
    alignItems: "center",
    border: "0px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "inherit",
    fontSize: "18px",
    fontWeight: 600,
    WebkitBoxPack: "center",
    justifyContent: "center",
    lineHeight: "1.1",
    opacity: 1,
    outline: "0px",
    transition: "background-color 0.2s ease 0s, opacity 0.2s ease 0s",
    height: "43px",
    padding: "0px 20px",
    backgroundColor: "#57e7c6",
    boxShadow: "none",
    color: "white",
    maxWidth: "100%",
    position: "absolute",
    right: "20px",
    marginTop: "-22px"
  },
  appbar: {
    position: "fixed",
    width: "100%",
    left: "0px",
    zIndex: 20,
    backgroundColor: "#fff",
    boxShadow: "none",
    borderBottom: "1px solid #bbb8b8",
    transition: "top 0.2s ease 0s",
    transform: "translate3d(0px, 0px, 0px)"
  },
  toolbar: {
    display: "flex",
    WebkitBoxPack: "justify",
    WebkitBoxAlign: "center",
    alignItems: "center",
    paddingLeft: "8px",
    paddingRight: "16px",
    width: "100%",
    height: "64px",
    margin: "0px auto"
  },
  btnbar: {
    display: "flex",
    WebkitBoxPack: "justify",
    WebkitBoxAlign: "center",
    alignItems: "center",
    paddingLeft: "8px",
    paddingRight: "16px",
    width: "100%",
    height: "64px",
    margin: "0px auto",
    justifyContent: 'space-between'
  }
}));

function Navbar() {
  const history = useHistory()
  const classes = useStyles();
  const theme = useTheme();
  const [isMenu, setisMenu] = useState(false);
  const { user, setUser } = useContext(AppContext)

  useEffect(()=>{
      if(!isMenu) setMenuSubMenu(false);
  },[isMenu]);

  let boxClass = ["main-menu menu-right menuq1"];
  if(isMenu) {
      boxClass.push('menuq2');
  }else{
      boxClass.push('');
  }
  const [isMenuSubMenu, setMenuSubMenu] = useState(false);
      
  const toggleSubmenu = () => {
    setMenuSubMenu(isMenuSubMenu === false ? true : false);
  };
  
  let boxClassSubMenu = ["sub__menus"];
  if(isMenuSubMenu) {
      boxClassSubMenu.push('sub__menus__Active');
  }else {
      boxClassSubMenu.push('');
  }

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("token", {path: "/"})

    setUser({    
        authenticated: false,
        email: "",
        phone: "",
        private_key: "",
        public_key: "",
        paypal: ""
    })
  }
  
  return (
    <AppBar className={classes.appbar}>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <NavLink exact activeClassName='is-active' to="/">
            <img src={nftIcon} style={{width: '50px'}} alt="CryptoTrades" /> 
        </NavLink>
        <div className={classes.btnbar}>
        <DrawerComponent />
        <div className="header__middle__menus">
            <nav className="main-nav " >
                <ul className={boxClass.join(' ')}>
                    <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> {user.email} </Link>
                        <ul className={boxClassSubMenu.join(' ')} style={{width: '180px', marginLeft: '-80px'}} > 
                            <li> <NavLink activeClassName='is-active'  to={`/profile`} style={{marginLeft: '10px'}}> Profile </NavLink> </li>
                            <li> <NavLink activeClassName='is-active'  to={`/changepassword`} style={{marginLeft: '10px'}} > Change Password </NavLink> </li>
                            <li> <NavLink activeClassName='is-active'  to={`/`} onClick={logout} style={{marginLeft: '10px'}}> Logout </NavLink> </li>
                        </ul>
                    </li>                   
                </ul>
            </nav>     
        </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
