import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MouseBubble from "./components/MouseBubble";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<MouseBubble content={<div>123</div>}>
			<div
				style={{
					marginTop: "200px",
					width: "200px",
					height: "200px",
					background: "pink",
				}}
			>
				hover me
			</div>
		</MouseBubble>
	</React.StrictMode>,
);
