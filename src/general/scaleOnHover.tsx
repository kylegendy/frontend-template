import React from "react";
import { HTMLAttributes } from "react";
import * as css from './ScaleOnHover.module.css';
const styles = css as any;

interface ScaleOnHoverProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode,
    
}

function ScaleOnHover(props: ScaleOnHoverProps) {

    let {
        children,
        className,
        ...args
    } = props;

    function addClasses(children: React.ReactNode) {
        if (React.isValidElement(children)) {
            let inputReactObject = React.Children.only(children) as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
            let clonedChild = React.cloneElement(inputReactObject, {
                className: `${styles.scaleContainer} ${children.props.className}`
            });

            children = clonedChild;
        }
        return children;
    }

    return (
        <div {...args} className={"relative " + className}>
            {addClasses(children)}
        </div>
    );
};

export default ScaleOnHover;