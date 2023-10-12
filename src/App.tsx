import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { TaskDataProvider } from "./Data/taskDataContext"
import { AccessTokenProvider } from "./Data/dataContext"
import { RefreshTrefreshProvider } from "./Data/refreshContext"
function App() {
  return (
    <RefreshTrefreshProvider>
    <AccessTokenProvider>
      <TaskDataProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </TaskDataProvider>
    </AccessTokenProvider>
    </RefreshTrefreshProvider>
  )
}

export default App
