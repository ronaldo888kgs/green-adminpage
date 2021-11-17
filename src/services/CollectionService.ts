import { code } from '../messages'
import { notifyError, notifyWarning } from './NotificationService'
import { API } from '../constants/api';
import axios from 'axios';
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie';
import { Collection } from '../types/AdminDataTypes'

interface CollectionService {
    getCollectionItems(
        paginationLimit: number,
        offset?: number,
        searchName?: string
    ): Promise<Collection[]>
}

export const getCollectionInfo = async (data: any) => {
    let w_return = {};

    await axios.post(API.server_url + API.collection_detail, data)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                w_return = data.result;
                notifyWarning(data.message)
            }
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

const setCookie = (token:string) => {
    let d = new Date();
    d.setTime(d.getTime() + (API.cookie_expire*60*1000));
    const cookies = new Cookies();
    cookies.set("token", token, {path: "/", expires: d, sameSite: 'lax'});
}

export const AddCollection = async (data: any) => {
    let w_return = '';
    const cookies = new Cookies()
    const headers = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ cookies.get('token')
        }
    };
    await axios.post(API.server_url + API.collection_add, data, headers)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                w_return = data.result;               
            }
            notifyWarning(data.message)
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

export const imageUpload = async (data: any, field:string) => {
    let w_return = false;
    let url = '';
    if(field == 'logo_img'){
        url = API.server_url + API.collection_logo_image_upload;
    } else {
        url = API.server_url + API.collection_banner_image_upload;
    }
    await axios.post(url, data)
    .then(response => {console.log(response)
        if(response.status === 200){
            let data = response.data;
            w_return = data.status;
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

export const updateImageInfo = async (data: any, field:string) => {
    let w_return = {};
    let url = '';
    if(field=='logo_img'){
        url = API.server_url + API.collection_update_logo_info;
    } else {
        url = API.server_url + API.user_update_cover_info;
    }
    await axios.post(url, data)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                setCookie(data.token)
                w_return = jwt(data.token);
            }
                
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

// export const updateProfile = async (data: any) => {
//     let w_return = {};
//     const cookies = new Cookies()
//     const headers = {
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': 'Bearer '+ cookies.get('token')
//         }
//     };
//     await axios.post(API.server_url + API.user_update, data, headers)
//     .then(response => {
//         if(response.status === 200){
//             let data = response.data;
//             if(data.status){
//                 setCookie(data.token)
//                 w_return = jwt(data.token);
//                 notifyWarning(data.message)
//             }
                
//         }
//     })
//     .catch(error => {
//         notifyError(code[5011], error)
//     })
    
//     return w_return;
// }

export const collectionService = () : CollectionService => {
    return {
        async getCollectionItems(
            paginationLimit,
            offset = 0,
            searchName: string
        ) {
            const cookies = new Cookies()
            const headers = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer '+ cookies.get('token')
                }
            };
            const result_data:Collection[] = [];
            let cond_data = {};
            cond_data['paginationLimit'] = paginationLimit;
            cond_data['offset'] = offset;
            cond_data['searchName'] = searchName;

            try {
                let w_result = await axios.post(API.server_url + API.collection_list, cond_data, headers)
                if(w_result.status === 200){
                    let data:any = w_result.data;
                    
                    if(data.status){
                        let w_cnt = 0;
                        data.data.find(item => {
                            let w_objTemp:Collection = {
                                id: '',
                                image: '',
                                name: '',
                                description: '',
                                banner: '',
                                royalties: 0,
                                status: 1,
                                create_date: ''
                            };
                            w_objTemp['id'] = item._id;
                            w_objTemp['image'] = item.image;
                            w_objTemp['name'] = item.name;
                            w_objTemp['description'] = item.description;
                            w_objTemp['banner'] = item.banner;
                            w_objTemp['royalties'] = item.royalties;
                            w_objTemp['status'] = item.status;
                            w_objTemp['create_date'] = item.create_date;
                            result_data[w_cnt] = w_objTemp;

                            w_cnt++;
                        })
                        return result_data;
                    }
                }
                return []
            } catch(error) {
                notifyError(code[5011], error)
                return []
            }
        }
    }
} 
