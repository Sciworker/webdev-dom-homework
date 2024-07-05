const path = require('path');

module.exports = {
  entry: '/src/main.js', // Входная точка вашего приложения
  output: {
    filename: 'main.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Путь к директории, где будет создан выходной файл
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Обработка JS файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Добавьте другие загрузчики по необходимости, например для CSS, изображений и т.д.
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Указание каталога статических файлов
    },
    compress: true,
    port: 8080, // Порт, на котором будет запущен сервер
  },
};
