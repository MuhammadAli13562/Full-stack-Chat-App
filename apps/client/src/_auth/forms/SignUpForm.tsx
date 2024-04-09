import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignUpFormValidation } from "../../lib/validation"
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
import { toast } from "react-toastify"
import React from "react"
import { useSignUpUserMutation } from "src/redux/api/auth/auth"
import { useVerificationOnMount } from "src/lib/hooks"

const SignUpForm = () => {
  useVerificationOnMount()
  const [SignUp] = useSignUpUserMutation()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(creds: z.infer<typeof SignUpFormValidation>) {
    try {
      const resp = await toast.promise(
        SignUp(creds).unwrap(),
        {
          pending: "Registering New User",
        },
        { position: "top-center" },
      )
      toast.success("Registration Successful")
      localStorage.setItem("token", resp.token)
    } catch (error: any) {
      error.status === 409
        ? toast.error("Email or Username Already taken")
        : toast.error("Registration Failed ! Try again.")
    }
  }
  return (
    <>
      <div className="col-center gap-2 mb-6">
        <span className="font-bold ">Create a new account</span>
        <span className="text-gray-400 ">
          To use this app enter your details
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 col-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="form-field"
                    placeholder="John Doe"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="form-field"
                    placeholder="123@abc.com"
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
                    className="form-field"
                    type="password"
                    placeholder="*******"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full primary-btn " type="submit">
            Sign Up
          </Button>
          <div className="text-sm text-gray-400">
            <span>Already have an account ? </span>
            <Link to="/sign-in" className="form-links ">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}

export default SignUpForm
