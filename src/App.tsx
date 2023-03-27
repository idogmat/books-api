import React, {useEffect} from 'react'
import './App.scss'
import {Search} from "./components/search";
import {useAppSelector} from "./store";
import {Book} from "./components/book";
import {Selector} from "./components/selector";
import {useDispatch} from "react-redux";
import {searchBooksTC, setCategory, setOrderBy, sortCategoryType, sortOrderByType} from "./store/booksReducer";

function App() {
    const category = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
    const sortDate = ['relevance', 'newest']
    const {books, loading, sortOrderBy, sortCategory, search} = useAppSelector(state => state.booksReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchBooksTC(search, sortCategory, sortOrderBy))
    }, [sortOrderBy,sortCategory])

    const setCategoryHandler = (value: string) => {
        dispatch(setCategory(value as sortCategoryType))
    }
    const setOrderByHandler = (value: string) => {
        dispatch(setOrderBy(value as sortOrderByType))
    }
    return <div>
        <Search/>
        <Selector types={category} callBack={setCategoryHandler}/>
        <Selector types={sortDate} callBack={setOrderByHandler}/>
        {loading ? <div>loading...</div>
            : <section>
                {books?.length > 0 ? books.map(e => <Book key={e.id} {...e}/>) : <h4>Nope results</h4>}
            </section>
        }
    </div>
}

export default App
