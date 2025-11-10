import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import AuthProvider from "@/components/provider/auth-provider";
import { store } from "@/store";


function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [isReady, setReady] = React.useState(false);

    useEffect(() => {
        setReady(true);
    }, [])

    useEffect(() => {
        if (!isReady || !router.isReady) return;

        const token = localStorage.getItem("token");
        const isAuthPage = router.pathname.startsWith("/auth");
        const isDashboard = router.pathname.startsWith("/dashboard");

        if (!token && !isAuthPage) {
            router.push("/auth/login");
        }
    }, [isReady, router.isReady, router.pathname])

    if (!isReady) {
        return null;
    }
    return (

        <>
            <Provider store={store}>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </Provider>
        </>

    );
}

export default App;