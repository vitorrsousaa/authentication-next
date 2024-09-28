import { env } from "@/config/environment";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Profile } from "@/entities/profile";
import { authServices } from "@/services/auth";
import { tokenStorage } from "@/storage/token-storage";
import { PageLoader } from "@/ui/page-loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

export interface IAuthContextValue {
	signedIn: boolean;
	signInWithGoogle: () => void;
	signout: () => void;
	user: Profile;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storageAccessToken = tokenStorage.get();

		return !!storageAccessToken;
	});

	const queryClient = useQueryClient();

	const { data, isFetching, isSuccess, isError } = useQuery({
		queryKey: QUERY_KEYS.PROFILE,
		queryFn: authServices.profile,
		enabled: signedIn,
		staleTime: Number.POSITIVE_INFINITY,
	});

	const signInWithGoogle = useCallback(() => {
		const CLIENT_ID = env.VITE_AUTH_GOOGLE_ID;
		const baseURL = "https://accounts.google.com/o/oauth2/auth";
		const options = qs.stringify({
			client_id: CLIENT_ID,
			redirect_uri: env.VITE_AUTH_REDIRECT_URI,
			response_type: "code",
			scope: "email profile",
		});
		setSignedIn(true);
		window.location.href = `${baseURL}?${options}`;
		// toast.info('Entrar com o Google!');
	}, []);

	const signout = useCallback(() => {
		tokenStorage.remove();
		queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.PROFILE,
		});
		setSignedIn(false);
		// toast.info('Sair!');
	}, [queryClient]);

	const value = useMemo<IAuthContextValue>(
		() => ({
			signedIn: isSuccess && signedIn,
			signInWithGoogle,
			signout,
			user: {
				name: data?.name || "",
				email: data?.email || "",
				id: data?.id || "",
				picture: data?.picture || "",
			},
		}),
		[signedIn, data, isSuccess, signInWithGoogle, signout],
	);

	useEffect(() => {
		if (isError) {
			signout();
		}
	}, [isError, signout]);

	return (
		<AuthContext.Provider value={value}>
			{isFetching && <PageLoader isLoading={isFetching} />}
			{!isFetching && children}
		</AuthContext.Provider>
	);
}
