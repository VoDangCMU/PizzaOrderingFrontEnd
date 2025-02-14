import {RegisterComponent} from "@/components/auth/register-form";

const Register: React.FC = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegisterComponent/>
            </div>
        </div>
    );
}

export default Register;