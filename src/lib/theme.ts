export const THEME_KEY = "pythonmates-theme";

// Runs in <head> before the page paints: saved choice first, otherwise the
// system setting. Avoids a flash of the wrong theme.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;
