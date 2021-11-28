import React, {useEffect, useRef, useState} from "react";
import {ResizableBox} from "react-resizable";

export interface VerticalResizeProps {
    firstNode?: React.ReactNode
    firstInitHeight?: number
    firstHideResize?: boolean
    firstResizable?: (width: number, height: number) => any
    firstMaxHeight?: number
    firstMinHeight?: number

    secondNode?: React.ReactNode
    secondResizable?: (width: number, height: number) => any
    secondHideResize?: boolean
    secondMaxHeight?: number
    secondMinHeight?: number
}

export const VerticalResize: React.FC<VerticalResizeProps> = props => {
    const div = useRef(null);
    const [maxWidth, setMaxWidth] = useState<number>(200);

    useEffect(() => {
        if (!div || !div.current) {
            return
        }

        const divTag = div.current as unknown as HTMLDivElement;
        setMaxWidth(divTag.clientWidth);
    }, [div])

    return <div style={{width: "100%"}} ref={div}>
        <ResizableBox
            width={maxWidth} height={props.firstInitHeight || 300}
            resizeHandles={props.firstHideResize ? [] : ["s", "se", "sw"]}
            maxConstraints={[maxWidth, props.firstMaxHeight || 400]}
            minConstraints={[maxWidth, props.firstMinHeight || 200]}
            onResizeStop={(_, data) => {
                props.firstResizable && props.firstResizable(data.size.width, data.size.height)
            }}
        >
            {props.firstNode}
        </ResizableBox>
        {props.secondNode && <ResizableBox
            width={maxWidth}
            maxConstraints={[maxWidth, props.secondMaxHeight || 400]}
            minConstraints={[maxWidth, props.secondMinHeight || 200]}
            onResize={(_, data) => {
                props.secondResizable && props.secondResizable(data.size.width, data.size.height)
            }}
            height={200}
            resizeHandles={props.secondHideResize ? [] : ["se", "sw", "s"]}
        >
            {props.secondNode}
        </ResizableBox>}
    </div>
}