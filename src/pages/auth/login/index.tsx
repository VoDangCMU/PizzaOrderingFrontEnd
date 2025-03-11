import { LoginForm } from "@/components/custom/auth/login-form"

export default function LoginPage() {
    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-kungfu-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-amber-800/20 z-0"></div>
            <LoginForm />
        </div>
    )
}

