import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignInFormValidation } from "../../lib/validation"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { SignIn } from "../../api/auth"
import { useVerificationOnMount } from "../../lib/auth"
import { toast } from "react-toastify"
import { useState } from "react"

const SignInForm = () => {
  useVerificationOnMount()
  const navigate = useNavigate()
  const [disableBtn, setDisableBtn] = useState(false)
  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(creds: z.infer<typeof SignInFormValidation>) {
    setDisableBtn(true)
    const resp = await SignIn(creds)
    console.log("resp : ", resp)

    if (resp?.status === 200) {
      toast.success("Sign In Successful")
      localStorage.setItem("token", resp.headers.token)
      navigate("/")
      return
    } else if (resp?.status === 401) toast.error("Invalid Username Or Password")
    else toast.error("Server Error ! ")

    console.log(creds)
    setDisableBtn(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 col-center"
      >
        <div>
          <span className="font-bold">Log in to your account</span>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="form-field"
                  placeholder="johndoe"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="form-field"
                  placeholder="*******"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={disableBtn}
          className="w-full primary-btn "
          type="submit"
        >
          Sign In
        </Button>
        <div className="text-sm text-gray-400">
          <span>Don't have an account ? </span>
          <Link to="/sign-up" className="form-links ">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
