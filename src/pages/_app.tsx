import React, {useEffect} from "react";
// import { appWithTranslation } from "next-i18next";
import {AppProps} from "next/app";
// import i18n from "../../i18n";
import "@/styles/globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import AuthProvider from "@/components/provider/auth-provider";
import {store} from "@/store";
import {BlogProvider} from "@/context/blog-context";


function App({Component, pageProps}: AppProps) {

    const router = useRouter();
    const [isReady, setReady] = React.useState(false);
    useEffect(() => {
        if (router.isReady) {
            setReady(true);
        }
    }, [router.isReady])
    if (!isReady) {
        return null;
    }
    const hidden = ["/dashboard", "/dashboard/analytics", "/dashboard/customers",
        "/dashboard/menu", "/dashboard/orders", "/dashboard/settings",
        "/dashboard/ingredients","/dashboard/tracking", "/dashboard/salesdata"
    ];
    return (

        <>
            <Provider store={store}>
                <AuthProvider>
                    {/*<CartProvider>*/}
                    <BlogProvider>
                        {!hidden.includes(router.pathname) && <Header/>}
                        <Component {...pageProps} />
                        {!hidden.includes(router.pathname) && <Footer/>}
                    </BlogProvider>
                </AuthProvider>
            </Provider>
        </>

    );
}

export default App;