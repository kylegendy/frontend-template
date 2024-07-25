import { HTMLAttributes } from "react";

import * as css from './menuButton.module.css';
const styles = css as any;

interface MenuButtonProps extends HTMLAttributes<HTMLElement> {
    iconColor?: string,
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

function MenuButton(props: MenuButtonProps) {

    const {
        iconColor,
        state,
        setState,
        className,
        style,
        ...args
    } = props;

    return (
        <div {...args} style={{ ...style }} className={"h-10 w-10 hamburgerMenuContainer " + className}>
            <label className={styles.hamburgerMenu}>
                <input 
                    style={{
                        backgroundColor: "red"
                    }}
                    type="checkbox" 
                    className={styles.menuCheckbox} 
                    onChange={(event) => {
                        setState(event.target.checked as boolean)
                    }}/>
            </label>
        </div>
    );
};

export default MenuButton;