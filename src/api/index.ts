import axios, {AxiosResponse} from "axios";
import {IResponseBooks} from "./type";

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
});
export const booksAPI = {
    getBooks: (search:string,category:string,sort:string) => {
        return instance.get<IResponseBooks>(`volumes?q=${search}+${category}&${sort}`)
    }
}