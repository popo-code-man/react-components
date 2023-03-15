import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import "./index.scss";
import _ from "lodash";

interface IProps {
	content: React.ReactNode;
	children: React.ReactNode;
}

function getOffset(el: any) {
	var _x = 0;
	var _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

const Index = memo((props: IProps) => {
	const { content, children } = props;

	const [show, setShow] = useState(false);
	const bubbleRef = useRef(null);
	const wrapperRef = useRef(null);

	const handleMouseLeave = _.debounce(() => {
		console.log("handleMouseLeave");
		setShow(false);
		document.removeEventListener("mousemove", documentMouseMove);
	}, 100);

	const handleMouseEnter = () => {
		console.log("handleMouseEnter");
		setShow(true);
		document.addEventListener("mousemove", documentMouseMove);
	};

	const documentMouseMove = useCallback((e: any) => {
		const [x, y] = [e.clientX, e.clientY];

		if (wrapperRef.current) {
			const { top, left } = getOffset(wrapperRef.current);
			if (y < top) {
        setShow(false);
				document.removeEventListener("mousemove", documentMouseMove);
			}
		}

		if (bubbleRef.current) {
			(bubbleRef.current as any).style.left = x + "px";
			(bubbleRef.current as any).style.top = y - 24 + "px";
		}
	}, []);

	const BubbleWrapper = () => (
		<div ref={bubbleRef} className="bubble_wrapper">
			{content}
		</div>
	);

	return (
		<>
			<div
				onMouseEnter={handleMouseEnter}
				// onMouseLeave={handleMouseLeave}
				className="mouse_bubble_wrapper"
				ref={wrapperRef}
			>
				{children}
				{show && BubbleWrapper()}
			</div>
		</>
	);
});

export default Index;
