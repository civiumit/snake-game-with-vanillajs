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

export default font
