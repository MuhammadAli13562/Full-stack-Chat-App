import { Routes, Route } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import RootLayout from "./_root/RootLayout"
import { Home } from "lucide-react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
const App = () => {
  return (
    <Provider store={store}>
      <main className="flex h-screen">
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>

          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </main>
    </Provider>
  )
}

export default App
