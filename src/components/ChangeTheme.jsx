import React, { useEffect } from 'react';
import { useAPIThemes } from "../hooks";

function ThemeItem({ theme, active, onClick }) {
    return (
        <span
            onClick={onClick}
            style={{
                cursor: 'pointer',
                paddingLeft: 8,
                fontWeight: active ? 'bold' : 'normal',
            }}
        >
            <span style={{ color: theme.primaryColor }}>Primary</span>/
            <span
                style={{
                    color: theme.secondaryColor,
                }}
            >
                Secondary
            </span>
        </span>
    );
}

export default function ChangeTheme({ theme, setTheme }) {
    const [themes, getThemes] = useAPIThemes();
    const { data, isLoading } = themes;

    useEffect(getThemes, []);
    function isActiive(t) {
        return (
            t.primaryColor === theme.primaryColor &&
            t.secondaryColor === theme.secondaryColor
        );
    }
    return (
        <div>
            {isLoading && 'Loading themes...'}
            Change Theme:
            {data &&
                data.map((th, i) => (
                    <ThemeItem
                        key={'theme-' + i}
                        theme={th}
                        active={isActiive(th)}
                        onClick={() => setTheme(th)}
                    />
                ))}
        </div>
    );
}
