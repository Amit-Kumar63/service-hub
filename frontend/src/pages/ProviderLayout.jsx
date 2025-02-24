import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetProviderProfileQuery } from "../app/api/api";
import { auth } from "../firebase-config";
import ProviderNavigation from "../components/ProviderNavigation";

const ProviderLayout = () => {
    const [providerToken, setProviderToken] = useState(null);
    const [isProviderTokenLoading, setIsProviderTokenLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [addServicePanel, setAddServicePanel] = useState(false);
    const [recentBookingsPanel, setRecentBookingsPanel] = useState(false);

    const {
        data: provider,
        isLoading: isProviderLoading,
        isSuccess:isProviderSuccess,
        isError: isProivderError,
        refetch
    } = useGetProviderProfileQuery(providerToken, {
        skip: !providerToken,
    });


    useEffect(() => {
        if (localStorage.getItem("token")) {
            auth.signOut();
            localStorage.removeItem("token");
        }
        const unSubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                currentUser.getIdToken().then((token) => {
                    setProviderToken(token);
                    setIsProviderTokenLoading(false);
                }
                )
                .catch((error) => {
                    console.error(error);
                    setIsProviderTokenLoading(false);
                    setProviderToken(null);
                }
                );
            } else {
                setProviderToken(null);
                setIsProviderTokenLoading(false);
            }
        });
        return () => unSubscribe();
    }, []);

    if (providerToken && !provider) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-slate-300 text-gray-500 font-semibold">
                Loading provider data....
            </div>
        );
    }

    return (
        <>
            <main>
                <Outlet
                    context={{
                        provider,
                        isProviderLoading,
                        isProviderSuccess,
                        isProivderError,
                        providerToken,
                        isProviderTokenLoading,
                        addServicePanel,
                        setAddServicePanel,
                        value,
                        setValue,
                        recentBookingsPanel,
                        setRecentBookingsPanel,
                    }}
                />
            </main>
            <div className="fixed bottom-0 z-10 right-0 left-0 border border-t border-gray-300">
            <ProviderNavigation
                value={value}
                setValue={setValue}
                setAddServicePanel={setAddServicePanel}
                addServicePanel={addServicePanel}
                setRecentBookingsPanel={setRecentBookingsPanel}
                recentBookingsPanel={recentBookingsPanel}
                />
            </div>
        </>
    );
};

export default ProviderLayout;
