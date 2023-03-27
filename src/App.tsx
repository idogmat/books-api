import React from 'react'
import './App.scss'
import {Search} from "./components/search";
import {useAppSelector} from "./store";
import {Book} from "./components/book";

function App() {
  const books = useAppSelector(state => state.booksReducer.books)
  const loading = useAppSelector(state => state.booksReducer.loading)
  return <div>
    <Search/>
    {loading ? <div>loading...</div>
    : <section>
      {books.length > 0 ? books.map(e=><Book key={e.id} {...e}/>) : <h4>Nope results</h4>}
    </section>
    }
  </div>
}

export default App
