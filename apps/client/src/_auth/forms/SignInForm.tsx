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
import React from "react"

import { toast } from "react-toastify"
import { useState } from "react"
import { useSignInUserMutation } from "src/redux/api/auth/auth"
import { useVerificationOnMount } from "src/lib/hooks"

const SignInForm = () => {
  useVerificationOnMount()

  const [SignIn] = useSignInUserMutation()
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
    try {
      const resp = await toast.promise(
        SignIn(creds).unwrap(),
        {
          pending: "Signing In",
        },
        { position: "top-center" },
      )
      localStorage.setItem("token", resp.token)
      localStorage.setItem("username", creds.username)
      toast.success("Signed In Successfully")
      navigate("/")
    } catch (error: any) {
      error.status === 401
        ? toast.error("Invalid Username or Password")
        : toast.error("Server Error !")
    }

    setDisableBtn(false)
  }

  return (
    <>
      <div>
        <span className="font-bold">Log in to your account</span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 col-center"
        >
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
                    autoComplete="true"
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
    </>
  )
}

export default SignInForm
