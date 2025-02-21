import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {useState} from "react";
export function RecoverPasswordComponent({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const [input, setInput] = useState<string>("");
    const inputTemp = "12345";
    const [loading, setLoading] = useState<boolean>(false);
    const handleRecoverPassword = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("Try to remember your password!!! ");
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Recover Your Password</CardTitle>
                    <CardDescription>
                        Please enter your email address or mobile number to recover your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6 ">
                            <div className="grid gap-2">
                                <Input
                                    id="input-email-&-password"
                                    placeholder="Enter your email address or mobile number"
                                    required
                                    onChange={p => setInput(p.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" onClick={handleRecoverPassword} disabled={loading}>
                                {loading ? "Loading..." : "Subscribe"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Have an account?{" "}
                            <a href="../auth/login" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}