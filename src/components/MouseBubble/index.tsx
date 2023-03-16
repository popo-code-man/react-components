import React, { memo, useState, useRef } from "react";
import "./index.scss";

interface IMouseBubble {
	content: string | React.ReactNode;
	children: string | React.ReactNode;
}

const index = memo((props: IMouseBubble) => {
	const { children, content } = props;
	const [visible, setVisible] = useState(false);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});
	const wrapperRef = useRef<any>(null);
	const bubbleRef = useRef<any>(null);
	const getOffset = (e: any) => {
		const event = e || window.event;
		const { x, y, width, height } = wrapperRef.current.getBoundingClientRect();
		const bubbleObj = bubbleRef.current.getBoundingClientRect();

		let _x = event.clientX;
		let _y = event.clientY;
		const winW = window.innerWidth;
		console.log(_x);

		if (_x > x + width || _x < x || _y > y + height || _y < y) {
			setVisible(false);
		}
		let bubbleX = _x - 30;
		let bubbleY = _y - bubbleObj.height - 18;
		if (bubbleX < 0) {
			bubbleX = 0;
		}
		if (bubbleX + bubbleObj.width > winW) {
			bubbleX = _x - bubbleObj.width + 30;
		}
		if (bubbleY < 0) {
			bubbleY = _y + 30;
		}
		return { x: bubbleX, y: bubbleY };
	};
	const handleMouseMove = (e: any) => {
		setVisible(true);

		const { x, y } = getOffset(e);

		setPosition({ left: x, top: y });
	};
	const handleMouseLeave = () => {
		setVisible(false);
	};

	return (
		<div
			className="mouse_bubble_wrapper"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
		>
			{children}
			<div
				className="bubble_wrapper"
				ref={bubbleRef}
				style={{
					left: `${position.left}px`,
					top: `${position.top}px`,
					visibility: `${visible ? "visible" : "hidden"}`,
				}}
			>
				{typeof content === "string" ? (
					<div className="bubble_content">{content}</div>
				) : (
					content
				)}
			</div>
		</div>
	);
});

export default index;
