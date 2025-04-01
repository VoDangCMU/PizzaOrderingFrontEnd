"use client";

import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { checkAuth } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);


    return <>{children}</>;
};

export default AuthProvider;