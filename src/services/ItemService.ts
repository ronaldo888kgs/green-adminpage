import { code } from '../messages'
import { notifyError, notifyWarning } from './NotificationService'
import { API } from '../constants/api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Item } from '../types/AdminDataTypes'

interface ItemService {
    getItems(
        paginationLimit: number,
        offset?: number,
        searchName?: string
    ): Promise<Item[]>
}

export const itemService = () : ItemService => {
    return {
        async getItems(
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
            const result_data:Item[] = [];
            let cond_data = {};
            cond_data['paginationLimit'] = paginationLimit;
            cond_data['offset'] = offset;
            cond_data['searchName'] = searchName;

            try { 
                let w_result = await axios.post(API.server_url + API.item_list, cond_data, headers)
                console.log(w_result)
                if(w_result.status === 200){
                    let data:any = w_result.data;
                    
                    if(data.status){
                        let w_cnt = 0;
                        data.data.find(item => {
                            let w_objTemp:Item = {
                                id: '',
                                image: '',
                                name: '',
                                description: '',
                                price: 0,
                                like_count: 0,
                                status: 0,
                                create_date: ''
                            };
                            w_objTemp['id'] = item._id;
                            w_objTemp['image'] = item.profile_image;
                            w_objTemp['name'] = item.username;
                            w_objTemp['description'] = item.description;
                            w_objTemp['price'] = item.price;
                            w_objTemp['like_count'] = item.like_count;
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
