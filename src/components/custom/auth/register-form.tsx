import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {useRouter} from "next/router";

const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().refine((date) => new Date(date) <= new Date(), "Invalid date of birth"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterComponent({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const res = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {

                return;
            }

            await router.push("/auth/login");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
            <Card className="w-[70%] md:w-[80%] max-w-4xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://m.media-amazon.com/images/M/MV5BMTA2NTM4OTc2MTZeQTJeQWpwZ15BbWU4MDg3ODYzMzEx._V1_.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create New Account</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create an account to discover wonderful pizza
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { id: "username", label: "Username", type: "text", placeholder: "m" },
                                    { id: "password", label: "Password", type: "password", placeholder: "password" },
                                    { id: "firstName", label: "First Name", type: "text", placeholder: "John" },
                                    { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
                                    { id: "email", label: "Email", type: "email", placeholder: "m@example.com" },
                                    { id: "phone", label: "Phone", type: "tel", placeholder: "1234567890" },
                                    { id: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "" },
                                ].map(({ id, label, type, placeholder }) => (
                                    <div key={id} className="flex flex-col gap-1">
                                        <Label htmlFor={id}>{label}</Label>
                                        <Input
                                            id={id}
                                            type={type}
                                            placeholder={placeholder}
                                            {...register(id as keyof RegisterFormData)}
                                            className={errors[id as keyof RegisterFormData] ? "border-red-500" : ""}
                                        />
                                        {errors[id as keyof RegisterFormData] && (
                                            <p className="text-red-500 text-sm">
                                                {errors[id as keyof RegisterFormData]?.message as string}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </Button>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="../auth/login" className="underline underline-offset-4">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div
                className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
