import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/hooks/useRegister";

type RegisterProps = {
  role?: "admin" | ""
  href?: string
  title?: string
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phoneNumber: z.string(),
  password: z.string().min(8, { error: "password should be minimum of 8" }),
  address: z.string(),
});

export default function RegisterForm({ role, href, title }: RegisterProps) {
    const { register } = useRegister()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    register(values.name, values.email, values.phoneNumber, values.password, values.address, role)
  }

  return (
    <Form {...form}>
      <div className="py-5">
        <h1 className="text-gray-900 font-semibold text-lg">{title ? title : "Register"}</h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-900">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  className="border-gray-900"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-900">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="border-gray-900"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-900">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                  className="border-gray-900"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-900">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  className="border-gray-900"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-900">
                Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Address"
                  {...field}
                  className="border-gray-900"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-gray-900 text-md text-center">
          Already have an account?{" "}
          <a className="text-blue-700" href={href ? href : "/auth/buyer/login"}>
            Login
          </a>
        </p>
      </form>
    </Form>
  );
}
