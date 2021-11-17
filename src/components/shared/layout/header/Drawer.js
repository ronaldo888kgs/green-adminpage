import React, { useState, useContext, useEffect } from "react";
import {AppContext} from '../../../../contexts';
import {
    Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { SvgIcon } from "@material-ui/core";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "white",
        fontSize: "14px",
        marginLeft: "10px",
        paddingRight: "80px",
        backgroundColor: "transparent"
    },
    menu:{
        color: "white",
        marginTop: "-5px",
        marginLeft: "0px",
        ['@media (min-width:600px)']: {
          marginLeft: '20px'
        }
    },
    icon:{
        color: "white",
        marginTop: "-10px"
    },
    drawer: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      top: '64px !important'
    },
    list: {
      backgroundColor: "#2f353a !important",
      opacity: "1"
    },
    listitem: {
      backgroundColor: "transparent",
      opacity: "1",
      '&:hover': {
        backgroundColor: 'rgb(255, 0, 0)',
        color: '#fff',
      },
      '&:active': {
        backgroundColor: 'rgb(255, 0, 0)',
        color: '#fff',
      }
    },
    gQYBcx: {
      display: "flex",
      WebkitBoxAlign: "center",
      alignItems: "center",
      WebkitBoxPack: "justify",
      justifyContent: "space-between",
      height: "48px",
      padding: "0px 16px"
    },
    cHQuCr: {
      display: "flex",
      WebkitBoxAlign: "center",
      alignItems: "center"
    },
    bRzrLL: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      WebkitBoxPack: "center",
      justifyContent: "center",
      WebkitBoxAlign: "center",
      alignItems: "center",
      marginRight: "8px",
    },
    bvzORg: {
      color: "rgb(255, 255, 255)",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: 1.5
    },
    social: {
      display: "flex",
      WebkitBoxAlign: "center",
      alignItems: "center",
      WebkitBoxPack: "justify",
      justifyContent: "end",
      height: "48px",
      padding: "0px 16px"
    },
    socialicon: {
      marginRight: "10px"
    },
    svgicon: {
      fontSize: '22px',
      marginTop: '5px'
    }
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const history = useHistory();
  const onOpenDrawer = (openable, url) => {
    setOpenDrawer(openable);
    history.push(url);
  }
  const {setIsOpenDrawer} = useContext(AppContext);

  useEffect(()=>{
    setIsOpenDrawer(openDrawer);
  }, [openDrawer])

  const MenuIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" style={{fontSize: '25px', color: 'black'}}>
        <path d="M26.75 15.75v1.5H6.25v-1.5h20.5zM26.75 23.75v1.5H6.25v-1.5h20.5zM26.75 8v1.5H6.25V8h20.5z"></path>
      </SvgIcon>
    );
  }

  const UsersIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path fillRule="evenodd" clipRule="evenodd" d="M25.798 13.259l-10.274-8.22L5.25 13.26V26.75h8.167l-.001-6.667h4.214l.001 6.667h8.167V13.259zM15.524 6.96l8.773 7.018V25.25H19.13l.001-6.667h-7.214l-.001 6.667H6.75V13.978l8.774-7.018z"></path>
      </SvgIcon>
    );
  }

  const CollectionsIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.25 9.636a4.386 4.386 0 118.773 0 4.386 4.386 0 01-8.773 0zm7.273 0a2.886 2.886 0 10-5.773 0 2.886 2.886 0 005.773 0zM17.977 22.364a4.386 4.386 0 118.773 0 4.386 4.386 0 01-8.773 0zm7.273 0a2.886 2.886 0 10-5.772 0 2.886 2.886 0 005.772 0z" />,
        <path d="M24.932 8.886v6.205h-1.5l-.001-4.705h-6.522v-1.5h8.023zM8.568 16.91v4.703h6.523v1.5H7.068V16.91h1.5z"></path>
        <path d="M19.636 5.848l1.061 1.061-2.728 2.727 2.728 2.728-1.06 1.06-3.789-3.788 3.788-3.788zM11.303 19.636l1.06-1.06 3.789 3.788-3.788 3.788-1.061-1.061 2.727-2.728-2.727-2.727z"></path>
      </SvgIcon>
    );
  }

  const ItemsIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path d="M9.795 7.71h6.792l1.96 7.92-1.457.36-1.678-6.781h-4.117v6.602h-1.5V7.709z"></path>
        <path d="M11.296 7.71v1.5H7.977v-1.5h3.319zM21.455 15.06c1.361 0 2.479 1.078 2.563 2.426l.005.163v2.587h-1.5V17.65c0-.559-.422-1.022-.953-1.082l-.115-.006H9.795v-1.5h11.66zM20.546 21.493v1.5h-5.819v-1.5h5.819z"></path>
        <path d="M23.114 11.385v1.5h-1.66c-.107 0-.146.021-.156.108l-.002.061v3.507h-1.5v-3.507c0-.913.626-1.594 1.509-1.663l.15-.006h1.659z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.25 20.405c0-2.95 2.369-5.344 5.296-5.344 2.926 0 5.295 2.395 5.295 5.344 0 2.95-2.37 5.345-5.295 5.345-2.927 0-5.296-2.395-5.296-5.345zm9.09 0c0-2.125-1.7-3.844-3.794-3.844-2.095 0-3.796 1.72-3.796 3.844 0 2.125 1.701 3.845 3.796 3.845 2.094 0 3.795-1.72 3.795-3.845zM19.796 22.243c0-1.935 1.555-3.506 3.477-3.506s3.477 1.571 3.477 3.506c0 1.935-1.555 3.507-3.477 3.507s-3.477-1.572-3.477-3.507zm5.454 0c0-1.11-.887-2.006-1.977-2.006s-1.977.896-1.977 2.006c0 1.11.887 2.007 1.977 2.007s1.977-.897 1.977-2.007z"></path>
      </SvgIcon>
    );
  }

  const CategoriesIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.75 6.25v3.618c1.543.073 2.953.37 4.043.832.63.268 1.19.606 1.602 1.02.415.416.719.95.719 1.58v8.534l3.219 1.594-.666 1.344-2.859-1.415c-.114.19-.256.366-.413.524-.412.413-.971.751-1.602 1.019-1.265.536-2.96.85-4.793.85-1.833 0-3.528-.314-4.793-.85-.63-.268-1.19-.606-1.602-1.02a2.773 2.773 0 01-.413-.523l-2.86 1.415-.665-1.344 3.22-1.594V13.3c0-.63.303-1.164.718-1.58.412-.414.971-.752 1.602-1.02 1.09-.462 2.5-.76 4.043-.832V6.25h1.5zm-6.364 9.233V22.3c0 .116.053.292.282.521.231.233.605.477 1.125.698 1.039.44 2.526.731 4.207.731s3.168-.29 4.207-.731c.52-.221.894-.465 1.125-.697.23-.23.282-.405.282-.522v-6.817c-.254.154-.53.293-.821.417-1.265.536-2.96.85-4.793.85-1.833 0-3.528-.314-4.793-.85a6.356 6.356 0 01-.82-.417zM21.614 13.3c0 .116-.053.292-.282.521-.231.233-.605.477-1.125.698-1.039.44-2.526.731-4.207.731s-3.168-.29-4.207-.731c-.52-.221-.894-.465-1.125-.697-.23-.23-.282-.405-.282-.522 0-.117.053-.292.282-.522.231-.232.605-.476 1.125-.697 1.039-.44 2.526-.731 4.207-.731s3.168.29 4.207.731c.52.221.894.465 1.125.697.23.23.282.405.282.522z"></path>
      </SvgIcon>
    );
  }

  const ActivitiesIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <rect x="6" y="7.304" width="7.478" height="7.478" rx="0.935" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" fill="transparent"></rect>
        <path clipRule="evenodd" d="M16.544 11.674a.892.892 0 010-1.261l3.782-3.782a.892.892 0 011.261 0l3.782 3.782a.892.892 0 010 1.26l-3.782 3.783a.892.892 0 01-1.261 0l-3.782-3.782z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" fill="transparent"></path>
        <rect x="17.218" y="18.522" width="7.478" height="7.478" rx="0.935" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" fill="transparent"></rect>
        <rect x="6" y="18.522" width="7.478" height="7.478" rx="0.935" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" fill="transparent"></rect>
      </SvgIcon>
    );
  }

  const OffersIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path d="M16 6C10.473 6 6 10.473 6 16s4.473 10 10 10 10-4.473 10-10S21.527 6 16 6zm0 18.605c-4.745 0-8.605-3.86-8.605-8.605 0-4.745 3.86-8.605 8.605-8.605 4.745 0 8.605 3.86 8.605 8.605 0 4.745-3.86 8.605-8.605 8.605z"></path>
        <path d="M15.712 17.91h-.006a.697.697 0 01-.69-.702l.002-.349c0-.02.002-.04.004-.06.096-1.013.769-1.634 1.31-2.134.183-.169.357-.329.505-.496.18-.203.441-.619.166-1.121-.317-.58-1.09-.744-1.691-.606-.628.143-.86.68-.942.986a.697.697 0 01-1.346-.36c.278-1.038.998-1.76 1.976-1.985 1.317-.3 2.643.232 3.225 1.296.485.886.352 1.927-.346 2.715-.194.218-.402.41-.602.595-.5.462-.813.77-.866 1.216l-.003.315a.696.696 0 01-.696.69zM15.712 20a.693.693 0 01-.491-1.188.72.72 0 01.982 0 .69.69 0 01.206.491.71.71 0 01-.203.495.71.71 0 01-.494.202z"></path>
      </SvgIcon>
    );
  }

  const SettingsIcon = ()=> {
    return (
      <SvgIcon viewBox="0 0 26 26" className={classes.svgicon}>
        <path d="M16 6C10.473 6 6 10.473 6 16s4.473 10 10 10 10-4.473 10-10S21.527 6 16 6zm0 18.605c-4.745 0-8.605-3.86-8.605-8.605 0-4.745 3.86-8.605 8.605-8.605 4.745 0 8.605 3.86 8.605 8.605 0 4.745-3.86 8.605-8.605 8.605z"></path>
        <path d="M15.712 13a.693.693 0 01-.491-1.188.72.72 0 01.982 0c.132.129.206.31.206.491a.71.71 0 01-.202.495.71.71 0 01-.495.202z"></path>
        <path stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M15.712 14.634v5.008"></path>
      </SvgIcon>
    );
  }
  return (
    <>
      <IconButton onClick={() => onOpenDrawer(!openDrawer, '#')} className={classes.menu}>
        <MenuIcon />        
      </IconButton>
      <Drawer
        open={openDrawer}
        onClose={() => onOpenDrawer(false, '#')}
        className={classes.drawer}
      >
        <List className={classes.list}>
          <ListItem onClick={() => onOpenDrawer(false, '/')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/')} className={classes.icon}>
              <UsersIcon />
            </IconButton>
            <ListItemText>
              <Link to="/" className={classes.link}>Users</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => onOpenDrawer(false, '/collections')} className={classes.listitem}>
            <ListItemText>
            <IconButton onClick={() => onOpenDrawer(false, '/collections')} className={classes.icon}>
              <CollectionsIcon />
            </IconButton>
              <Link to="/collections" className={classes.link}>Collections</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => onOpenDrawer(false, '/items')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/items')} className={classes.icon}>
              <ItemsIcon />
            </IconButton>
            <ListItemText>
              <Link to="/items" className={classes.link}>Items</Link>
            </ListItemText>
          </ListItem>
          {/* <ListItem onClick={() => onOpenDrawer(false, '/categories')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/categories')} className={classes.icon}>
              <CategoriesIcon />
            </IconButton>
            <ListItemText>
              <Link to="/categories" className={classes.link}>Categories</Link>
            </ListItemText>
          </ListItem> */}
          <ListItem onClick={() => onOpenDrawer(false, '/activities')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/activities')} className={classes.icon}>
              <ActivitiesIcon />
            </IconButton>
            <ListItemText>
              <Link to="/activities" className={classes.link}>Activities</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => onOpenDrawer(false, '/offers')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/offers')} className={classes.icon}>
              <OffersIcon />
            </IconButton>
            <ListItemText>
              <Link to="/offers" className={classes.link}>Offers</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => onOpenDrawer(false, '/settings')} className={classes.listitem}>
            <IconButton onClick={() => onOpenDrawer(false, '/settings')} className={classes.icon}>
              <SettingsIcon />
            </IconButton>
            <ListItemText>
              <Link to="/settings" className={classes.link}>Settings</Link>
            </ListItemText>
          </ListItem>
        </List>        
      </Drawer>
    </>
  );
}
export default DrawerComponent;
