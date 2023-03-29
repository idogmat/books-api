import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import App from "../../app/App";
import {LayoutBook} from "../layoutBook";

export const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/book/:id" element={<LayoutBook />} />
                <Route path="*" element={<Navigate to={'404'}/>} />
                <Route path="404" element={<div>404</div>} />
            </Routes>
        </HashRouter>
    )
}