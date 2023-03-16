import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MouseBubble from "./components/MouseBubble";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<div
			style={{
				height: "300px",
			}}
		></div>
		<MouseBubble content={<div>哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>}>
			<div className="app_mouse_bubble">
				hover me
				<button>
					啊吧啊爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸吧
				</button>
			</div>
		</MouseBubble>
		<MouseBubble content={"哈哈哈哈哈哈哈哈哈哈哈哈哈哈"}>
			<div className="app_mouse_bubble">
				hover me2
			</div>
		</MouseBubble>
	</React.StrictMode>,
);
