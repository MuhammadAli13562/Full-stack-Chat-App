import { Routes, Route, BrowserRouter as Router } from "react-router-dom"

import RootLayout from "./_root/RootLayout"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Home from "./_root/pages/Home"
import { AuthLayout } from "./_auth/AuthLayout"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
const App = () => {
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
            </Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  )
}

export default App
