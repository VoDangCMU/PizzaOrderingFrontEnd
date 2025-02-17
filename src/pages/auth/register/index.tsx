import {RegisterComponent} from "@/components/custom/auth/register-form";
import {GetServerSideProps} from "next";

const Register: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-10">
            <div className="w-full max-w-sm md:max-w-6xl">
                <RegisterComponent/>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
        },
    };
};
export default Register;