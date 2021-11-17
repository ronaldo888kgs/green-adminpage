import { code } from '../messages'
import { notifyError, notifyWarning } from './NotificationService'
import { API } from '../constants/api';
import axios from 'axios';
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie';
import { User } from '../types/AdminDataTypes'

interface UserService {
    getUserItems(
        paginationLimit: number,
        offset?: number,
        searchName?: string
    ): Promise<User[]>
}

export const userService = () : UserService => {
    return {
        async getUserItems(
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
            const result_data:User[] = [];
            let cond_data = {};
            cond_data['paginationLimit'] = paginationLimit;
            cond_data['offset'] = offset;
            cond_data['searchName'] = searchName;

            try { 
                let w_result = await axios.post(API.server_url + API.user_list, cond_data, headers)
                if(w_result.status === 200){
                    let data:any = w_result.data;
                    
                    if(data.status){
                        let w_cnt = 0;
                        data.data.find(item => {
                            let w_objTemp:User = {
                                id: '',
                                image: '',
                                name: '',
                                first_name: '',
                                last_name: '',
                                email: '',
                                status: '',
                                create_date: ''
                            };
                            w_objTemp['id'] = item._id;
                            w_objTemp['image'] = item.profile_image;
                            w_objTemp['name'] = item.username;
                            w_objTemp['first_name'] = item.first_name;
                            w_objTemp['last_name'] = item.last_name;
                            w_objTemp['email'] = item.email;
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

export const statusUpdate = async (data: any) => {
    let w_return = false;
    const cookies = new Cookies()
    const headers = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ cookies.get('token')
        }
    };
    await axios.post(API.server_url + API.user_update, data, headers)
    .then(response => {console.log(response)
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                w_return = true;
                notifyWarning(data.message)
            }                
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })
    
    return w_return;
}




export const exist = async () => {
    let w_return = 0;
    await axios.post(API.server_url + API.admin_exist)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            w_return = data['count'];
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

export const register = async (data: any) => {
    let w_return = '';
    await axios.post(API.server_url + API.admin_register, data)
    .then(response => {console.log(response)
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                setCookie(data.token)
                w_return = jwt(data.token);
            }
            notifyWarning(data.message)
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

export const login = async (data: any) => {
    let w_return = '';
    await axios.post(API.server_url + API.admin_login, data)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                setCookie(data.token)
                w_return = jwt(data.token);
            }
            notifyWarning(data.message)
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

export const updateProfile = async (data: any) => {
    let w_return = {};
    const cookies = new Cookies()
    const headers = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ cookies.get('token')
        }
    };
    await axios.post(API.server_url + API.admin_update, data, headers)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                setCookie(data.token)
                w_return = jwt(data.token);
            }
            notifyWarning(data.message)                
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })
    
    return w_return;
}

export const forgot = async (data: any) => {
    let w_return = false;
    await axios.post(API.server_url + API.admin_forgot, data)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                    
                w_return = data.status;
            }
            notifyWarning(data.message) 
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })

    return w_return;
}

export const changePassword = async (data: any) => {
    let w_return = false;
    const cookies = new Cookies()
    const headers = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ cookies.get('token')
        }
    };
    await axios.post(API.server_url + API.admin_change, data, headers)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            if(data.status){
                w_return = data.status;  
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
    if(field == 'profile_image'){
        url = API.server_url + API.user_profile_image_upload;
    } else {
        url = API.server_url + API.user_profile_cover_upload;
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
    if(field=='profile_image'){
        url = API.server_url + API.user_update_image_info;
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

export const verify = async (data: any) => {
    let w_return = {};
    await axios.post(API.server_url + API.user_opt_verify, data)
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

export const resetPassword = async (data: any) => {
    let w_return = false;
    const cookies = new Cookies()
    const headers = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ cookies.get('token')
        }
    };
    await axios.post(API.server_url + API.user_reset, data, headers)
    .then(response => {
        if(response.status === 200){
            let data = response.data;
            notifyWarning(data.message)
            w_return = data.status;                
        }
    })
    .catch(error => {
        notifyError(code[5011], error)
    })
    
    return w_return;
}
