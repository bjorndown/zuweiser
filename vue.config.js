const publicPath = process.env.NODE_ENV === 'production' ? '/zuweiser/' : '/'

module.exports = {
    publicPath,
    configureWebpack: {
        entry: './src/gui/main.ts'
    }
}
