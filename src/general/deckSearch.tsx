import { HTMLAttributes, useRef, useState, useEffect } from "react";

interface DeckSearchProps extends HTMLAttributes<HTMLElement> {
    positionState?: {
        position: number, // the current center of the carousel
        setPosition: React.Dispatch<React.SetStateAction<number>>,
    },
    wingCount: number, // the max count of visible cards to one side of the active card
    transitionDuration?: string, // see examples of durations here https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
    circular?: boolean,
    sticky?: boolean,
    styleFunctions?: {
        // opacityFunction:
        // args: 
        //      - diffFromCenter: the difference between this card and the current middle of the carousel (note, each card is a whole number starting from zero)
        // returns: outputs a number between 0 and 1
        opacityFunction?: (diffFromCenter: number) => number,
        // scaleFunction:
        // args: 
        //      - diffFromCenter: the difference between this card and the current middle of the carousel (note, each card is a whole number starting from zero)
        // returns: outputs a number to scale the card, 1 being normal. see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
        scaleFunction?: (diffFromCenter: number) => number,
        // yTransFunction:
        // args: 
        //      - diffFromCenter: the difference between this card and the current middle of the carousel (note, each card is a whole number starting from zero)
        // returns: outputs a number to y-translate the card, 0 being normal. see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY
        yTransFunction?: (diffFromCenter: number) => number
    },
    children: Array<React.ReactNode>
}
function DeckSearch(props: DeckSearchProps) {

    const {
        positionState,
        wingCount,
        transitionDuration,
        circular,
        styleFunctions,
        sticky,

        children,
        className,
        ...args
    } = props;

    const [position, setPosition] = positionState ?
        [positionState.position, positionState.setPosition] :
        useState<number>(0);

    const ref = useDrag(position, setPosition, sticky ?? true);

    return (
        <div ref={ref as React.LegacyRef<HTMLDivElement>} {...args} className={`${className}`}>
            <ListContainer 
                positionState={{
                    position: position,
                    setPosition: setPosition
                }} 
                wingCount={wingCount}
                transitionDuration={transitionDuration}
                circular={circular}
                styleFunctions={styleFunctions}
                className={`flex flex-row relative w-full h-full`} 
                children={children} 
            />
        </div>
    );
};
export default DeckSearch;

function useDrag(position: number, setPosition: React.Dispatch<React.SetStateAction<number>>, sticky: boolean) {
    const ref = useRef(null);
    const positionRef = useRef<number>(position);

    positionRef.current = position;

    let pressed = false;
    let startX = 0;
    let delta = 0;

    useEffect(() => {

        let handleMouseDown = (e: any) => {}
        let handleMouseUp = (e: any) => {}
        let handleMouseMove = (e: any) => {}

        let handleTouchStart = (e: any) => {}
        let handleTouchEnd = (e: any) => {}
        let handleTouchMove = (e: any) => {}

        if (ref.current) {

            handleMouseDown = (e: any) => {
                pressed = true;
            }
            handleMouseUp = (e: any) => {
                pressed = false;
                if (sticky) {
                    setPosition(Math.round(positionRef.current));
                }
            }
            handleMouseMove = (e: any) => {
                if (!pressed) 
                    return;
                e.preventDefault();

                // divide difference by arbitrary pixel number to determine speed of scroll
                delta = -e.movementX / 350;

                setPosition(positionRef.current + delta);
            }
            (ref.current as any).addEventListener("mousedown", handleMouseDown);
            (ref.current as any).addEventListener("mouseup", handleMouseUp);
            (ref.current as any).addEventListener('mousemove', handleMouseMove);

            handleTouchStart = (e: any) => {
                pressed = true;
                startX = e.changedTouches[0].clientX;
            }
            handleTouchEnd = (e: any) => {
                pressed = false;
                if (sticky) {
                    setPosition(Math.round(positionRef.current));
                }
            }
            handleTouchMove = (e: any) => {
                if (!pressed) 
                    return;
                e.preventDefault();

                // divide difference by arbitrary pixel number to determine speed of scroll
                delta = (startX - e.changedTouches[0].clientX) / 350;
                startX = e.changedTouches[0].clientX;

                setPosition(positionRef.current + delta);
            }
            (ref.current as any).addEventListener("touchstart", handleTouchStart);
            (ref.current as any).addEventListener("touchend", handleTouchEnd);
            (ref.current as any).addEventListener('touchmove', handleTouchMove);
        }

        return () => {
            if (ref.current) {
                (ref.current as any).removeEventListener("mousedown", handleMouseDown);
                (ref.current as any).removeEventListener("mouseup", handleMouseUp);
                (ref.current as any).removeEventListener('mousemove', handleMouseMove);

                (ref.current as any).removeEventListener('touchstart', handleTouchStart);
                (ref.current as any).removeEventListener('touchend', handleTouchEnd);
                (ref.current as any).removeEventListener('touchmove', handleTouchMove);
            }
        }
    }, []);

    return ref;
}

// sub-components

interface ListContainerProps extends HTMLAttributes<HTMLOListElement> {
    positionState: {
        position: number, // the current center of the carousel
        setPosition: React.Dispatch<React.SetStateAction<number>>,
    },
    wingCount: number,
    transitionDuration?: string,
    circular?: boolean,
    styleFunctions?: {
        opacityFunction?: (diffFromCenter: number) => number,
        scaleFunction?: (diffFromCenter: number) => number,
        yTransFunction?: (diffFromCenter: number) => number
    }
    children: Array<React.ReactNode>
}
function ListContainer(props: ListContainerProps) {
    const [ref, width] = useElementSize();

    const {
        positionState,
        wingCount,
        transitionDuration,
        circular,
        styleFunctions,

        children,
        className
    } = props;

    return (
        <ol ref={ref as React.LegacyRef<HTMLOListElement>} className={`${className}`}>
            {children.map((elem, index) => {

                return (
                    <ItemContainer 
                        key={index} index={index} 
                        className={`absolute left-1/2 select-none`}
                        styleFuncArgs={{
                            contWidth: width as number,
                            activeLocation: positionState.position,
                            wingCount: wingCount,
                            transitionDuration: transitionDuration,
                            circular: circular,
                            childCount: children.length,
                            styleFunctions: styleFunctions
                        }}
                    >
                        {elem}
                    </ItemContainer>
                )
            })}
        </ol>
    );
}

interface ItemContainerProps extends HTMLAttributes<HTMLLIElement> {
    index: number,
    styleFuncArgs: {
        contWidth: number,
        activeLocation: number,
        wingCount: number,
        transitionDuration?: string,
        circular?: boolean,
        childCount: number,
        styleFunctions?: {
            opacityFunction?: (diffFromCenter: number) => number,
            scaleFunction?: (diffFromCenter: number) => number,
            yTransFunction?: (diffFromCenter: number) => number
        }
    }
}
function ItemContainer(props: ItemContainerProps) {
    const [ref, width] = useElementSize();

    const {
        index,
        styleFuncArgs,
        children,
        ...args
    } = props;

    let styleObject = getTransformStyleObject(index,(width as number),styleFuncArgs);

    return (
        <li ref={ref as React.LegacyRef<HTMLLIElement>} {...args} 
            style={
                styleFuncArgs.transitionDuration ?
                {
                    transition: 'all',
                    transitionDuration: styleFuncArgs.transitionDuration,
                    ...styleObject
                } :
                { ...styleObject }
            }
        >
            {children}
        </li>
    );
}

function useElementSize() {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                const { width } = (ref.current as any).getBoundingClientRect();
                setWidth(width);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [ref, width];
};

function getXTransPerc(containerWidth: number, cardWidth: number, cardDistance: number, wingCount: number): number {

    const relAbsMaxCardDistance = (containerWidth / 2 - cardWidth / 2) / cardWidth;
    const cardStepDistance = relAbsMaxCardDistance / wingCount;

    let xTrans = cardDistance < 0 ?
        Math.max(cardDistance * cardStepDistance, -relAbsMaxCardDistance) :
        Math.min(cardDistance * cardStepDistance, relAbsMaxCardDistance);
    
    return xTrans * 100 - 50;
}

function getTransformStyleObject(cardIndex: number, cardWidth: number, styleFuncArgs: {
    contWidth: number,
    activeLocation: number,
    wingCount: number,
    transitionDuration?: string,
    circular?: boolean,
    childCount: number,
    styleFunctions?: {
        opacityFunction?: (diffFromCenter: number) => number,
        scaleFunction?: (diffFromCenter: number) => number,
        yTransFunction?: (diffFromCenter: number) => number
    }
}) {

    let cardDistFromCurrLocation =  cardIndex - styleFuncArgs.activeLocation;

    // update cardDistFromCurrLocation if circular
    if (!!styleFuncArgs.circular) {
        cardDistFromCurrLocation = cardIndex - ( trueMod(styleFuncArgs.activeLocation, styleFuncArgs.childCount));

        if (cardDistFromCurrLocation > styleFuncArgs.childCount / 2) {
            cardDistFromCurrLocation = cardDistFromCurrLocation - styleFuncArgs.childCount;
        }
        else if (cardDistFromCurrLocation < -styleFuncArgs.childCount / 2) {
            cardDistFromCurrLocation = cardDistFromCurrLocation + styleFuncArgs.childCount;
        }
    }

    let transform=`translateX(${getXTransPerc(styleFuncArgs.contWidth, cardWidth, cardDistFromCurrLocation, styleFuncArgs.wingCount)}%)`;

    const { styleFunctions } = styleFuncArgs;

    let opacity = 1;
    if (styleFunctions?.opacityFunction) {
        opacity = styleFunctions.opacityFunction(cardDistFromCurrLocation);
    }
    if (styleFunctions?.scaleFunction) {
        transform += ` scale(${styleFunctions.scaleFunction(cardDistFromCurrLocation)})`
    }
    if (styleFunctions?.yTransFunction) {
        transform += ` translateY(${styleFunctions.yTransFunction(cardDistFromCurrLocation)}%)`
    }

    // z-index
    let zindex = Math.max(styleFuncArgs.wingCount + 2 - Math.round(Math.abs(cardDistFromCurrLocation)), 0);

    return {
        zIndex: zindex,
        transform: transform,
        opacity: opacity
    }
}

function trueMod(a: number, n: number): number {
    return ((a % n ) + n ) % n;
}