// Key to use for localStorage of color scheme setting
const STORAGE_KEY = 'user-color-scheme';

// Button element selectors
const modeToggleButton = document.querySelector('.js-mode-toggle');
const modeToggleText = document.querySelector('.js-mode-toggle-text');

// Media query info for default system color scheme
let isSystemDark = window.matchMedia('(prefers-color-scheme: dark)');



// Find out the user's default system color scheme, 'light' or 'dark'
const getSystemColorScheme = () => {
    return isSystemDark.matches ? 'dark' : 'light';
};

// Takes either a string ('light'|'dark') or gets that from localStorage.
// If it can’t find the setting in either, it tries to load the default system color scheme.
const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
    
    if(currentSetting) {
        document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
        setButtonLabelAndStatus(currentSetting);
    }
    else {
        setButtonLabelAndStatus(getSystemColorScheme());
    }
}

// Gets the current setting, reverses it, and stores it
const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);
    
    switch(currentSetting) {
        case null:
            currentSetting = getSystemColorScheme() === 'dark' ? 'light' : 'dark';
            break;
        case 'light':
            currentSetting = 'dark';
            break;
        case 'dark':
            currentSetting = 'light';
            break;
    }

    localStorage.setItem(STORAGE_KEY, currentSetting);
    
    return currentSetting;
}

// Shared method for setting the button text label etc
const setButtonLabelAndStatus = currentSetting => { 
    modeToggleText.innerText = `Switch to ${currentSetting === 'dark' ? '🌞 light' : '🌚 dark'} theme`;
}


// Attach listener to button which applies the setting returned from toggleSetting
modeToggleButton.addEventListener('click', () => {    
    applySetting(toggleSetting());
});

// Attach listener to apply the correct setting when default system color scheme changes 
isSystemDark.addEventListener('change', () => {
    applySetting();
});

// Attach listener to apply the correct setting on page load
document.addEventListener('DOMContentLoaded', () => {
    applySetting();
});
