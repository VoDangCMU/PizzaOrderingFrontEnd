import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";
import {RegisterRequest} from "@/utils/types";

export function RegisterComponent({
                                      className,
                                      ...props
                                  }: React.ComponentProps<"div">) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const registerRequest: RegisterRequest = {
            username,
            password,
            email,
            phone,
            firstName,
            lastName,
            dateOfBirth
        }
        try {
            const res = await fetch("auth/register", {
                method: "{PUT}",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerRequest)
            });
            if (res.ok) {
                alert("Login successful")
            } else
                alert("Login failed");

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://m.media-amazon.com/images/M/MV5BMTA2NTM4OTc2MTZeQTJeQWpwZ15BbWU4MDg3ODYzMzEx._V1_.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create New Account</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create an account to discover wonderful pizza
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="m"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className={"grid gap-2"}>
                                <Label htmlFor={"password"}>Password</Label>
                                <Input
                                    id={"password"}
                                    type={"password"}
                                    placeholder={"password"}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="1234567890"
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input
                                    id="first-name"
                                    type="text"
                                    placeholder="John"
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input
                                    id="last-name"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date-of-birth">Date of Birth</Label>
                                <Input
                                    id="date-of-birth"
                                    type="date"
                                    required
                                    onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                                />
                            </div>
                            <Button type="submit" className="w-full" onClick={handleRegister} disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </Button>
                            <div
                                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="">Privacy Policy</a>.
            </div>
        </div>
    )
}
