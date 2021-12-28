// Elements inside the canvas shape their colors from here.
// Food drawing directly uses the colorful function
const colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    purple: '#ff00ff',
    orange: '#ffa500',
    pink: '#ffc0cb',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    yellowgreen: '#9acd32',
    black: '#000000',
    white: '#ffffff',
    colorfull() {
        const ObjValToArr = Object.values(this);
        const randomIndex = Math.floor(Math.random() * ObjValToArr.length);
        return ObjValToArr[randomIndex];
    }
}

const font = {
    // System UI font family
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Oxygen, Cantarell, sans-serif',
    size: {
        sm: '12px',
        md: '14px',
        lg: '18px',
        xl: '24px'
    },
    getFont(size) {
        return `${this.size[size]} ${this.fontFamily}`;
    }
}

export { colors, font }