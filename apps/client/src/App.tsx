import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RootLayout from "./_root/RootLayout"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Home from "./_root/pages/Home"
import { AuthLayout } from "./_auth/AuthLayout"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import { useRegisterSocketEvents } from "./lib/hooks/useRegisterSocketEvents"
import Test from "./_root/pages/Test"
import { useEffect } from "react"
const App = () => {
  useRegisterSocketEvents()

  useEffect(() => {
    console.log("Whole App Remounted")

    return () => {}
  }, [])

  return (
    <Provider store={store}>
      <main className="flex h-screen">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/sign-up" element={<SignUpForm />} />
            </Route>

            {/* Private Routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer theme="dark" position="top-right" autoClose={2000} />
      </main>
    </Provider>
  )
}

export default App
