import React, { useEffect, useState } from 'react';

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
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        fetch('api/themes')
            .then((result) => result.json())
            .then(setThemes);
    }, []);
    function isActiive(t) {
        return (
            t.primaryColor === theme.primaryColor &&
            t.secondaryColor === theme.secondaryColor
        );
    }
    return (
        <div>
            Change Theme:
            {themes.map((th, i) => (
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
