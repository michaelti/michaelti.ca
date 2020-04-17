// Key to use for localStorage of theme setting
const THEME_STORAGE_KEY = 'user-theme';

// Button element selectors
const modeToggleButton = document.querySelector('#js-btn-theme-switcher');
const iconLight = document.querySelector('#js-btn-theme-switcher > .icon-light');
const iconDark = document.querySelector('#js-btn-theme-switcher > .icon-dark');
const iconAutomatic = document.querySelector('#js-btn-theme-switcher > .icon-automatic');


// Takes a theme setting string ('light'|'dark'|null) and applies it
const applySetting = (setting) => {    
    if (setting) {
        localStorage.setItem(THEME_STORAGE_KEY, setting);
        document.documentElement.setAttribute('data-user-theme', setting);
    } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
        document.documentElement.removeAttribute('data-user-theme');
    }

    setButtonAttributes(setting);
}

// Set the theme switcher button's active icon and label
const setButtonAttributes = (setting) => { 
    iconLight.classList.remove('active');
    iconDark.classList.remove('active');
    iconAutomatic.classList.remove('active');

    switch(setting) {
        case null:
            iconAutomatic.classList.add('active');
            modeToggleButton.setAttribute('aria-label', 'Switch to light theme (currently using automatic)');
            break;
        case 'light':
            iconLight.classList.add('active');
            modeToggleButton.setAttribute('aria-label', 'Switch to dark theme (currently using light)');
            break;
        case 'dark':
            iconDark.classList.add('active');
            modeToggleButton.setAttribute('aria-label', 'Switch to automatic theme (currently using dark)');
            break;
    }
}

// Gets the current theme from localStorage and returns the next possible setting
const getNextSetting = () => {    
    switch (localStorage.getItem(THEME_STORAGE_KEY)) {
        case null:
            return 'light';
        case 'light':
            return 'dark';
        case 'dark':
            return null;
    }
}


// Attach listener to the button which applies the next setting
modeToggleButton.addEventListener('click', () => {    
    applySetting(getNextSetting());
});

// Attach listener to apply the correct setting on page load
document.addEventListener('DOMContentLoaded', () => {
    applySetting(localStorage.getItem(THEME_STORAGE_KEY));
});
