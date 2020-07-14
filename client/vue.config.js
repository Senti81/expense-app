module.exports = {
  "outputDir": "D:\\dev\\expense-app\\server\\public",
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:3000/"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}