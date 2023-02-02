// Используем функцию require.context webpack для получения списка файлов
const requireContext = require.context("../modules/", true, /store\.js$/);

// получаем массив типа ['./store-gamelist/store.js'], структура вложенности всегда одинаковая


// Преобразуем каждый файл в модуль vuex
export default requireContext.keys().reduce((modules, filename) => {
    const moduleName = filename
        .split("/")[1]
        .replace('store-', '');
    modules[moduleName] =
        requireContext(filename).default || requireContext(filename);
    return modules;
}, {});