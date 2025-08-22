import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col  gap-2">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="font-semibold">Email</Label>
          <Input id="email" type="email" placeholder="Email" className=" border-gray-900" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="font-semibold">Password</Label>
          </div>
          <Input id="password" type="password" placeholder="Password" className=" border-gray-900" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4 text-blue-600">
          Register
        </a>
      </div>
    </form>
  )
}
