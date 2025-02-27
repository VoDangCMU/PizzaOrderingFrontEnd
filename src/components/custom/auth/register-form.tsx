import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/router";

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

            if (!res.ok) return;
            await router.push("/auth/login");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 items-center ", className)} {...props}>
            <Card className="w-full max-w-5xl rounded-lg shadow-lg overflow-hidden bg-white border-4 border-yellow-400">
                <CardContent className="grid md:grid-cols-2 p-0">
                    <div className="hidden md:block bg-muted relative">
                        <img
                            src="https://m.media-amazon.com/images/M/MV5BMTA2NTM4OTc2MTZeQTJeQWpwZ15BbWU4MDg3ODYzMzEx._V1_.jpg"
                            alt="Pizza Image"
                            className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
                        />
                    </div>
                    <form className="p-6 md:p-8 w-full bg-white" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-gray-800">Join Pizza Lovers</h1>
                                <p className="text-gray-600">Sign up to get the best pizza deals!</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {["username", "password", "firstName", "lastName", "email", "phone", "dateOfBirth"].map(id => (
                                    <div key={id} className="flex flex-col gap-1">
                                        <Label htmlFor={id} className="text-gray-700">{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
                                        <Input
                                            id={id}
                                            type={id === "password" ? "password" : id === "dateOfBirth" ? "date" : "text"}
                                            {...register(id as keyof RegisterFormData)}
                                            className={errors[id as keyof RegisterFormData] ? "border-red-500" : "border-gray-300"}
                                        />
                                        {errors[id as keyof RegisterFormData] && (
                                            <p className="text-red-500 text-sm">{errors[id as keyof RegisterFormData]?.message as string}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold" disabled={loading}>
                                {loading ? "Loading..." : "Sign Up"}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account? <a href="../auth/login" className="text-red-500 hover:underline">Sign in</a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
