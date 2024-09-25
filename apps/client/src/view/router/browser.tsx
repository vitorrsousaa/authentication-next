import { ROUTES } from "@/config/routes";
import { Dashboard } from "@/screens/dashboard";
import { Settings } from "@/screens/settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
				<Route path={ROUTES.SETTINGS} element={<Settings />} />
			</Routes>
		</BrowserRouter>
	);
}
