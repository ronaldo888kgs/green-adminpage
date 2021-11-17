/*
Project : Cryptotrades
FileName :  api.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which contain all api constants used in the application 
*/
export const API = {
    //server_url: "http://localhost:5002",
    server_url: "https://myapptest123321.herokuapp.com/",
    cookie_expire: 60,  //1h

    admin_exist: "/admin/exist",
    admin_register: "/admin/register",
    admin_login: "/admin/login",
    admin_forgot:"/admin/forgot",
    admin_update: "/admin/update",
    admin_change: "/admin/change",

    user_list: "/user/fulllist",
    user_update: "/user/statusupdate",
    collection_list: "/collection/fulllist",
    item_list: "/item/fullist",
    item_logo_image: "/images/item/logo/",
    item_banner_image: "/images/item/banner/",

    user_login: "/user/login",
    user_opt_verify: "/user/opt_verify",
    user_profile_image: "/images/user/",
    user_profile_image_upload: '/media/avatar',
    user_update_image_info: '/user/update_profile_image_info',
    user_profile_cover: "/images/cover/",
    user_profile_cover_upload: '/media/cover',
    user_update_cover_info: '/user/update_profile_cover_info',
    user_register:"/user/register",
    user_forgot:"/user/forgot",
    user_reset:"/user/reset",
    user_profile: "/user/profile",
    user_change: "/user/change",

    item_check_balance: "/item/checkbalance",
    item_transfer_balance: "/item/sendeth",

    collection_add: "/collection/add",
    collection_update: "/collection/update",
    collection_detail: "/collection/detail",
    collection_delete: "/collection/delete",
    collection_logo_image: "/images/collection/logo/",
    collection_logo_image_upload: '/media/collectionlogo',
    collection_update_logo_info: '/collection/collection_update_logo_info',
    collection_banner_image: "/images/collection/banner/",
    collection_banner_image_upload: '/media/collectionbanner',
    collection_update_banner_info: '/collection/collection_update_banner_info',

    category_list: "/category/list",
    item_add: "/item/add",
    item_update: "/item/update",
    item_delete: "/item/delete",
    
    item_favourite_list: "/item/favouriteslist",
    item_listbycollection: "/item/listbycollection",
    item_publish: "/item/publish",
    item_purchase: "/item/purchase",
    item_views_add: "/item/addviews",
    item_like_add: "/item/addfavourites",
    item_report: "/item/report",
    item_more_collection: "/item/morefromcollection",
    item_history: "/item/history",
    item_prices: "/item/prices",

    item_offers: "/item/offers",
    item_offer_add: "/item/addoffer",
    item_offer_remove: "/item/removeoffer",
    item_offer_action: "/item/actionoffer",
}