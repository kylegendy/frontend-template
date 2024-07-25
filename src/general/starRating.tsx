import { read } from "fs";
import { HTMLAttributes, useState } from "react";

interface StarsRatingProps extends HTMLAttributes<HTMLElement> {
    defaultValue?: number,
    readOnly?: boolean,
    rateState?: {
        rating: number,
        setRating: React.Dispatch<React.SetStateAction<number>>
    }
}
function StarsRating(props: StarsRatingProps) {

    const {
        defaultValue,
        readOnly,
        rateState,

        className,
    } = props

    const [rating, setRating] = rateState ?
    [rateState.rating, rateState.setRating] :
    useState<number>(defaultValue ?? 5);

    return (
        <div className={`inline-flex items-center ${className}`}>

            {Array.from({ length: 5 }, (_,key) => {
                return (
                    <Star key={key} index={key} rateState={{rating: rating, setRating: setRating as React.Dispatch<React.SetStateAction<number>>}} readonly={readOnly} />
                );
            })}
        </div>
    );
}

export default StarsRating;

interface StarProps extends HTMLAttributes<HTMLLIElement> {
    index: number,
    rateState: {
        rating: number,
        setRating: React.Dispatch<React.SetStateAction<number>>
    },
    readonly?: boolean
}
function Star(props: StarProps) {

    const {
        index,
        rateState,
        readonly,
        ...args
    } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 
                ${index > rateState.rating ? 'text-gray-500' : 'text-yellow-700'} 
                ${!!readonly ? '' : 'cursor-pointer'}
            `}
            onClick={() => {
                if (!readonly) {
                    rateState.setRating(index);
                }
            }}
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
            />
        </svg>
    );
}