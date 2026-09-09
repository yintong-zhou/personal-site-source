window.copyToClipboard = async function (text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('Email address copied to clipboard!');
    } catch {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Email address copied to clipboard!');
    }
};

window.ChangeColor = function () {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-bs-theme');
    root.setAttribute('data-bs-theme', currentTheme === 'dark' ? 'light' : 'dark');
};
