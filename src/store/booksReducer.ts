import {AppThunkType} from "./index";
import {booksAPI} from "../api";
import {} from 'redux-thunk/extend-redux';
import {IBook, IResponseBooks} from "../api/type";

export type BooksActionType = ReturnType<typeof setBooks>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setCategory>
    | ReturnType<typeof setOrderBy>
    | ReturnType<typeof setSearch>
    | ReturnType<typeof loadNewPage>
    | ReturnType<typeof setStartIndex>
    | ReturnType<typeof setCurrentBook>

export type sortCategoryType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'
export type sortOrderByType = 'relevance' | 'newest'

interface IState {
    search: string,
    sortCategory: sortCategoryType
    sortOrderBy: sortOrderByType
    loading: boolean
    totalItems: number
    startIndex: number
    maxResults: number
    currentBook: IBook | null
    books: IBook[]
}

const initialState: IState = {
    search: '',
    sortCategory: 'all',
    sortOrderBy: 'relevance',
    startIndex: 0,
    maxResults: 30,
    loading: false,
    totalItems: 0,
    currentBook: null,
    books: []
}
export const booksReducer = (state = initialState, action: BooksActionType) => {
    switch (action.type) {
        case "SET-BOOKS":
            return {
                ...state,
                totalItems: action.books.totalItems,
                books: action.books.items
            }
        case "LOADING-BOOKS":
            return {
                ...state,
                loading: action.loading
            }
        case "SET-SEARCH":
            return {
                ...state,
                search: action.search
            }
        case "SET-CATEGORY":
            return {
                ...state,
                sortCategory: action.category
            }
        case "SET-ORDER-BY":
            return {
                ...state,
                sortOrderBy: action.orderBy
            }
        case "LOAD-PAGE":
            return {
                ...state,
                books: [...state.books, ...action.books.items]
            }
        case "SET-START-INDEX":
            return {
                ...state,
                startIndex: action.startIndex,

            }
        case "SET-CURRENT-BOOK":
            return {
                ...state,
                currentBook: action.book,

            }
        default:
            return state
    }

}
const setBooks = (books: IResponseBooks) => ({type: "SET-BOOKS", books}) as const
const setLoading = (loading: boolean) => ({type: "LOADING-BOOKS", loading}) as const
export const setSearch = (search: string) => ({type: "SET-SEARCH", search}) as const
export const setCategory = (category: sortCategoryType) => ({type: "SET-CATEGORY", category}) as const
export const setOrderBy = (orderBy: sortOrderByType) => ({type: "SET-ORDER-BY", orderBy}) as const
export const loadNewPage = (books: IResponseBooks) => ({type: "LOAD-PAGE", books}) as const
export const setStartIndex = (startIndex: number) => ({type: "SET-START-INDEX", startIndex}) as const
export const setCurrentBook = (book: IBook) => ({type: "SET-CURRENT-BOOK", book}) as const

export const searchBooksTC = ()
    : AppThunkType =>
    async (dispatch, getState) => {
        dispatch(setStartIndex(0))
        const {search, sortCategory, sortOrderBy, startIndex, maxResults} = getState().booksReducer
        dispatch(setLoading(true))
        try {
            let {data} = await booksAPI.getBooks(search, sortCategory !== "all"
                    ? "subject:" + sortCategory
                    : "",
                "orderBy=" + sortOrderBy,
                startIndex,
                maxResults)
            dispatch(setBooks(data))
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch(setLoading(false))
        }
    }
export const paginationTC = ()
    : AppThunkType =>
    async (dispatch, getState) => {
        dispatch(setLoading(true))
        const {search, sortCategory, sortOrderBy, startIndex, maxResults} = getState().booksReducer
        dispatch(setStartIndex(startIndex + maxResults))
        try {
            let {data} = await booksAPI.getBooks(search, sortCategory !== "all"
                    ? "subject:" + sortCategory
                    : "",
                "orderBy=" + sortOrderBy,
                startIndex,
                maxResults)
            dispatch(loadNewPage(data))
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch(setLoading(false))
        }
    }
    export const getCurrentBook = (id:string)
    : AppThunkType =>
    async (dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            let {data} = await booksAPI.getCurrentBook(id)
            dispatch(setCurrentBook(data))
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch(setLoading(false))
        }
    }

