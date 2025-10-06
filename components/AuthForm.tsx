"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { success, z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
//import FormField from "@/components/FormField";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
// firebase imports
import { constants } from "http2";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { AwardIcon } from "lucide-react";
import { auth } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
  const router = useRouter();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created Successfully , please Sign IN");
        router.push("/sign-in");

        // sign IN part
      } else {
        // working for action

        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken(); // used user credential to generta id token( user for session)

        if (!idToken) {
          toast.error("Sign In Failed");
          return; // exits from here
        }

        await signIn({
          // signin server action call
          email,
          idToken,
        });

        // normal res
        toast.success("Sign in successfully");
        router.push("/");
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
            <Button type="submit" className="btn-primary w-full">
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
