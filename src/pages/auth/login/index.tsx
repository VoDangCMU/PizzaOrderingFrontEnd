import {LoginComponent} from "@/components/auth/login-form";


const LoginPage: React.FC = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginComponent/>
            </div>
        </div>
    );
}

export default LoginPage;