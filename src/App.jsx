import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Questions from "./Pages/Questions/Questions"


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/:problems/:digit/:negative/:questions" element={<Questions />} />
    </Routes>
      
    </>
  )
}

export default App
