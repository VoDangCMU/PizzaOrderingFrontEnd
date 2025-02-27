import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LoginComponent({ className, ...props }: React.ComponentProps<"div">) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                alert("Login successful");
            } else {
                alert("Login failed");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden border-4 border-yellow-400 shadow-lg rounded-xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                                <p className="text-balance text-gray-600">
                                    Login to your Acme Inc account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="border-gray-300 shadow-sm"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required
                                       className="border-gray-300 shadow-sm"
                                       onChange={(p) => setPassword(p.target.value)} />
                            </div>
                            <Button type="submit" className="w-full bg-red-600 text-white py-3 font-semibold rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleLogin} disabled={loading}>
                                {loading ? "Loading..." : "Login"}
                            </Button>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="../auth/register" className="underline underline-offset-4 text-red-600 hover:text-red-800">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-gray-100 border-l border-gray-300 md:block">
                        <img
                            src="https://m.media-amazon.com/images/M/MV5BMTA2NTM4OTc2MTZeQTJeQWpwZ15BbWU4MDg3ODYzMzEx._V1_.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-gray-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red-600">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}