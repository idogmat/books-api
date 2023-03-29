import React, {useEffect} from 'react'
import './App.scss'
import {Search} from "../components/search";
import {useAppSelector} from "../store";
import {Book} from "../components/book";
import {Selector} from "../components/selector";
import {useDispatch} from "react-redux";
import {
    paginationTC,
    searchBooksTC,
    setCategory,
    setOrderBy,
    sortCategoryType,
    sortOrderByType
} from "../store/booksReducer";
import {Button} from "../components/button";

function App() {
    const category = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
    const sortDate = ['relevance', 'newest']
    const {
        books,
        totalItems,
        loading,
        sortOrderBy,
        sortCategory,
        startIndex
    } = useAppSelector(state => state.booksReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchBooksTC())
    }, [sortOrderBy, sortCategory])

    const setCategoryHandler = (value: string) => {
        dispatch(setCategory(value as sortCategoryType))
    }
    const setOrderByHandler = (value: string) => {
        dispatch(setOrderBy(value as sortOrderByType))
    }
    const loadPage = () => {
        if (totalItems > startIndex) {
            dispatch(paginationTC())
        }
    }
    return <div>
        <Search/>
        <div className={'selectors'}>
            <Selector types={category} callBack={setCategoryHandler}/>
            <Selector types={sortDate} callBack={setOrderByHandler}/>
        </div>
        <p>books found: {totalItems}</p>
        {loading ? <div>loading...</div>
            : <section>
                {books?.length > 0 ? books.map((e, i) => <Book key={e.id + i} {...e}/>) : <h4>Nope results</h4>}
            </section>
        }
        <Button callBack={loadPage} disabled={loading || totalItems < startIndex}>load</Button>
    </div>
}

export default App
