(function() {
    // Key to use for localStorage
    const THEME_STORAGE_KEY = 'user-theme';

    // Button element selectors
    const switchButton = document.querySelector('#js-btn-theme-switcher');
    const iconLight = document.querySelector('#js-btn-theme-switcher > .js-theme-icon-light');
    const iconDark = document.querySelector('#js-btn-theme-switcher > .js-theme-icon-dark');
    const iconAutomatic = document.querySelector('#js-btn-theme-switcher > .js-theme-icon-automatic');

    // Takes a theme setting string ('light'|'dark'|null) and applies it
    const applySetting = (setting, setStorage=true) => {
        if (setting) {
            document.documentElement.setAttribute('data-user-theme', setting);
            if (setStorage) localStorage.setItem(THEME_STORAGE_KEY, setting);
        } else {
            document.documentElement.removeAttribute('data-user-theme');
            if (setStorage) localStorage.removeItem(THEME_STORAGE_KEY);
        }

        setButtonAttributes(setting);
        setPicturesThemed(setting);
    };

    // Set the theme switcher button's active icon and label
    const setButtonAttributes = (setting) => {
        iconLight.classList.remove('active');
        iconDark.classList.remove('active');
        iconAutomatic.classList.remove('active');

        switch(setting) {
            case null:
                iconAutomatic.classList.add('active');
                switchButton.setAttribute('aria-label','Switch to light theme (currently using automatic)');
                break;
            case 'light':
                iconLight.classList.add('active');
                switchButton.setAttribute('aria-label', 'Switch to dark theme (currently using light)');
                break;
            case 'dark':
                iconDark.classList.add('active');
                switchButton.setAttribute('aria-label', 'Switch to automatic theme (currently using dark)');
                break;
        }
    };

    // Make the correct default from all picture <source> elements with the desired color scheme
    const setPicturesThemed = (setting) => {
        document.querySelectorAll('picture > source[data-user-theme]').forEach(el => {
            el.remove();
        });

        if (setting) {
            document.querySelectorAll(`picture > source[media="(prefers-color-scheme: ${setting})"]`).forEach(el => {
                const cloned = el.cloneNode();
                cloned.removeAttribute('media');
                cloned.setAttribute('data-user-theme', setting);
                el.parentNode.prepend(cloned);
            });
        }
    };

    // Given a setting ('light'|'dark'|null), returns the next possible setting
    const getNextSetting = (setting) => {
        switch (setting) {
            case null:
                return 'light';
            case 'light':
                return 'dark';
            case 'dark':
                return null;
        }
    };

    // Apply the next setting on button click
    switchButton.addEventListener('click', () => {
        applySetting(getNextSetting(localStorage.getItem(THEME_STORAGE_KEY)));
    });

    // Apply the correct (stored or default) setting on page load
    document.addEventListener('DOMContentLoaded', () => {
        applySetting(localStorage.getItem(THEME_STORAGE_KEY), false);
    });
})();
