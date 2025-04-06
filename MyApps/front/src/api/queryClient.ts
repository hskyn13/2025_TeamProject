import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({

    //리액트 쿼리 인증실패시 사용
    defaultOptions: {

        queries: {

            retry: false,
        },

        mutations:{

            retry : false,
        },
    },
});

export default queryClient;