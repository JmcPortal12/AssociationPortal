import { Routes,Route } from "react-router-dom"
import HomePage from  "../HomePage"
import LoginPage from "../LoginPage"
import Create from "../Create"
import Update from "../Update"


function Router() {
  return (
    <Routes >
        <Route path="homePage" element={<HomePage/>}/>
        <Route path="*" element={<HomePage/>}/>
        <Route path="create" element ={<Create/>}/>
        <Route path="update" element ={<Update/>}/>
        <Route path="/" element={<LoginPage/>}/>
    </Routes>
  )
}

export default Router