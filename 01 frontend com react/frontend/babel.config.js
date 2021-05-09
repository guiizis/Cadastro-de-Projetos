module.exports = {
  presets: [
    '@babel/preset-env', //converter o cod para a versao do browser
    '@babel/preset-react' //converter o react para o browser entender 
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}