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

const SignInForm = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof SignInFormValidation>) {
    navigate("/")
    console.log(values)
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
                  placeholder="example123"
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
        <Button className="w-full primary-btn " type="submit">
          Sign In
        </Button>
        <div className="text-sm text-gray-400">
          <span>Don't have an account ? </span>
          <Link to="/sign-up" className="text-primary-lighter ">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
