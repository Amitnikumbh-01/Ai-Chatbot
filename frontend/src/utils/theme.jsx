export const setTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };
  
  export const getInitialTheme = () => {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
  
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  
    return 'light';
  };
  
  export const getThemeColors = (theme) => {
    return {
      primary: theme === 'dark' ? '#1e293b' : '#ffffff',
      secondary: theme === 'dark' ? '#334155' : '#f1f5f9',
      text: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      accent: '#0ea5e9',
    };
  };