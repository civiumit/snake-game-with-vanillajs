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

export default colors