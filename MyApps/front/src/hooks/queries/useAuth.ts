import { useMutation,useQuery, } from "@tanstack/react-query";
import { getAccessToken, getProfile, logout, postLogin, postSingup } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions, } from "@/types/common";
import { setEncryptStorage, removeHeader, setHeader } from "@/utils";
import { useEffect } from "react";
import queryClient from "@/api/queryClient";
import { queryKeys, storageKeys, numbers } from "@/constants";



function useSingup(mutationOptions?: UseMutationCustomOptions){


    return useMutation({
        mutationFn: postSingup,
        /*onError: (error) => error.response.data.message*/
        ...mutationOptions,

    });
}

function useLogin(mutationOptions?: UseMutationCustomOptions){

    return useMutation({

        mutationFn: postLogin,
        onSuccess: ({accessToken, refreshToken}) => {

            setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
            setHeader('Authorization',`Bearer ${accessToken}`);
            //axiosInstance.defaults.headers.common['Authorization'] = accessToken; // default로 header가 들어감
        },

        onSettled: () => {
            queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],});
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],});

        },

        ...mutationOptions,

    }); 
}

function useGetRefreshToken(){

   const {isSuccess,data, isError} =  useQuery({
        queryKey: [queryKeys.AUTH,  queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,


    });

    useEffect(() => {
        if(isSuccess){

            setHeader('Authorization',`Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess]);


    useEffect(() => {
        if(isError){

            removeHeader('Authorization');
            setEncryptStorage(storageKeys.REFRESH_TOKEN, '');
            
        }

    },[isError]);

    return {isSuccess,isError};
}



function useGetProfile(queryOptions?: UseQueryCustomOptions ){

    return useQuery({
        
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions,
    });

}

function useLogout(mutationOptions?: UseMutationCustomOptions){
    return useMutation({

        mutationFn: logout,
        onSuccess: () => {
            
            removeHeader('Authorization');
            setEncryptStorage(storageKeys.REFRESH_TOKEN, '');

        },

        onSettled: () => {

            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});

        },
        ...mutationOptions
        

    })

}

function useAuth(){

    const signupMutation = useSingup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        enabled: refreshTokenQuery.isSuccess
    });

    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {signupMutation, loginMutation, isLogin, getProfileQuery, logoutMutation};


}

export default useAuth;