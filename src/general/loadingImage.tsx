import { HTMLAttributes, useState } from "react";
import * as css from './LoadingImage.module.css';
const styles = css as any;

interface LoadingImageProps extends HTMLAttributes<HTMLDivElement> {
    imgAttributes: React.ImgHTMLAttributes<HTMLImageElement>,
}

function LoadingImage(props: LoadingImageProps) {

    const [loading, setLoading] = useState(true);
    const {imgAttributes, ...attr} = props;

    return (
        <div {...attr}
            className={loading ?  styles.loadingImg + (props.className ? " " + props.className : "")  : props.className}
        >
            <img {...imgAttributes} onLoad={() => setLoading(false)} />
        </div>
    );
};

export default LoadingImage;