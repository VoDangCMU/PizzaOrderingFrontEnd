import React, {useEffect} from "react";
// import { appWithTranslation } from "next-i18next";
import {AppProps} from "next/app";
// import i18n from "../../i18n";
import "@/styles/globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
// import {router} from "next/client";
import {useRouter} from "next/router";
// import { Provider } from 'react-redux';
// import { store, persistor} from "@/utils/redux/store";
// import {PersistGate} from "redux-persist/integration/react";

function App({Component, pageProps}: AppProps) {
    // useEffect(() => {
    //     const browserLanguage = navigator.language || "en";
    //     if (i18n.language !== browserLanguage) {
    //         i18n.changeLanguage(browserLanguage);
    //     }
    // }, []);
    const router = useRouter();
    const [isReady, setReady] = React.useState(false);
    useEffect(() => {
        if(router.isReady){
            setReady(true);
        }
    },[router.isReady])
    if(!isReady){
        return null;
    }
    const hiddenHeader =["/dashboard", "/dashboard/analytics", "/dashboard/customers",
                                    "/dashboard/menu", "/dashboard/orders"
    ];
    return (
        // < Provider store={store} >
        //     <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        //         <Layout className="bg-black/90">
        //             <HeaderComp />
        //             <Navbar />
        //             <Content>

        <>
            { !hiddenHeader.includes(router.pathname) && <Header/>}
            <Component {...pageProps} />
            <Footer />
        </>
        //             <FooterComp />
        //         </Layout>
        //     </PersistGate>
        // </Provider>
    )
        ;
}

// App.getInitialProps = async (appContext: AppContext) => {
//     const { ctx } = appContext;
//     const language = ctx.req
//         ? ctx.req.headers["accept-language"]
//         : navigator.language;
//     if (i18n.language !== language) {
//         await i18n.changeLanguage(language);
//     }
//
//     return {};
// };

// export default appWithTranslation(App);
export default App;