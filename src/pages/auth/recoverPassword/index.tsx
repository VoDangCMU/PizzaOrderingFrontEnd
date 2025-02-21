import {RecoverPasswordComponent} from "@/components/custom/auth/RecoverPassword-form";
import {GetServerSideProps} from "next";



const RecoverPassword: React.FC = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RecoverPasswordComponent/>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
    return {
        props: {},
    };
};

export default RecoverPassword;