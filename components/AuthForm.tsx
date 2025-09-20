"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
//import FormField from "@/components/FormField";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

// Validation schema
const authformSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter(); // to display the sucess toast message while submit ( import form next navigation)
  const formSchema = authformSchema(type);
  const isSignIN = type === "sign-in";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created Successfully , please Sign IN");
        router.push("/sign-in"); // if successful then push (route) to signin
      } else {
        toast.success("Sign in successfully");
        router.push("/"); // push to home page
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an ERROR ${error}`);
    }
  }

  return (
    <div className="card-border lg:min-w-[566px] mx-auto">
      <div className="card flex flex-col gap-6 py-14 px-10 rounded-2xl shadow-lg relative">
        <div className="absolute top-4 right-4">
          <Image src="/logo.svg" alt="logo" height={28} width={32} />
        </div>

        <div className="text-center">
          <h2 className="text-primary-100 text-4xl font-semibold">SmartMate</h2>
          <h3 className="text-lg font-medium text-center mt-2">
            Practice job interview with AI
          </h3>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4"
          >
            {!isSignIN && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Full Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email Address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-lg shadow-md
                 hover:bg-gray-600 hover:shadow-lg active:bg-gray-800 active:scale-95
                 transition-all duration-200"
            >
              {isSignIN ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        {/* Bottom Link */}
        <p className="text-center mt-4">
          {isSignIN ? "No account yet?" : "Have an account already?"}{" "}
          <Link
            href={isSignIN ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1 hover:text-gray-700 active:text-gray-900 transition-colors"
          >
            {isSignIN ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
