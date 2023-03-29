import axios, {AxiosResponse} from "axios";
import {IBook, IResponseBooks} from "./type";

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
});
export const booksAPI = {
    getBooks: (search:string,category:string,sort:string,startIndex:number,maxResults:number) => {
        return instance.get<IResponseBooks>(`volumes?q=${search}+${category}&${sort}&startIndex=${startIndex}&maxResults=${maxResults}`)
    },
    getCurrentBook: (id:string) => {
        return instance.get<IBook>(`volumes/${id}`)
    }
}