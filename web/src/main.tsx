import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { RecoilRoot } from "recoil";
import App from "./containers/App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<VisibilityProvider>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</VisibilityProvider>
	</React.StrictMode>
);
