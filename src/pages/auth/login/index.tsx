import {LoginComponent} from "@/components/custom/auth/login-form";
import {GetServerSideProps} from "next";


const LoginPage: React.FC = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-black/10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginComponent/>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
    return {
        props: {
        },
    };
};

export default LoginPage;