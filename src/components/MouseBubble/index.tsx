// 引入必要的包和组件
import React, { memo, useState, useRef, MouseEvent } from "react";
import "./index.scss";

// 定义组件的属性类型
interface IMouseBubble {
	content: string | React.ReactNode; // 气泡中的内容
	children: string | React.ReactNode; // 用户悬停的内容
}

// 定义 MouseBubble 组件
const index = memo((props: IMouseBubble) => {
	// 组件接收两个参数 children 和 content，分别表示触发气泡提示框的区域和提示框中要展示的内容。
	const { children, content } = props;

	// 定义组件的状态变量
	const [visible, setVisible] = useState(false); // 气泡是否可见
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	}); // 气泡的位置

	// 定义组件的引用变量
	const wrapperRef = useRef<HTMLDivElement>(null); // 外层元素的引用
	const bubbleRef = useRef<HTMLDivElement>(null); // 气泡元素的引用

	// 计算气泡的位置，首先获取触发气泡提示框的区域的位置和尺寸信息，再获取提示框自身的位置和尺寸信息。根据鼠标事件的坐标和这些信息，计算出气泡提示框应该出现的位置，并返回该位置。
	const getOffset = (e: MouseEvent) => {
		const event = e || window.event;
		const { x, y, width, height } = (
			wrapperRef.current as HTMLDivElement
		).getBoundingClientRect();
		const bubbleObj = (
			bubbleRef.current as HTMLDivElement
		).getBoundingClientRect();

		let _x = event.clientX;
		let _y = event.clientY;
		const winW = window.innerWidth;

		// 如果鼠标移出了外层元素，则隐藏气泡
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

	// 处理鼠标移动事件
	// 当鼠标移入触发区域时，函数调用 setVisible 方法将 visible 状态设置为 true，然后调用 getOffset 方法计算气泡提示框的位置，并将位置信息更新到 position 状态中。当鼠标移出触发区域时，函数调用 setVisible 方法将 visible 状态设置为 false，从而隐藏气泡提示框。
	const handleMouseMove = (e: MouseEvent) => {
		setVisible(true);

		// 计算气泡位置
		const { x, y } = getOffset(e);

		// 更新气泡位置
		setPosition({ left: x, top: y });
	};

	// 处理鼠标离开事件
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
