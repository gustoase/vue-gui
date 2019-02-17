import Vue from 'vue';

let cache_components = {};

function loadComponents(lib) {
    if (!lib) {
        console.error('Lib name is required');
        return;
    }
    let components = {};
    let flat_components = {};

    if (!cache_components[lib]) {
        cache_components[lib] = {
            components: {},
            component_names: {},
            flat_component_names: {},
            config: {}
        };
        console.log('create cache')
    } else {
        console.log('load from cache');
        return cache_components[lib];
    }

    console.log('load components from lib:', lib);

    // конфиг настройки контролов
    cache_components[lib].config = require(`../../libs/${lib}/config.js`).default;


    const context = require.context('../../libs', true, /\.vue$/);
    context.keys().forEach(function (key) { // see: https://webpack.github.io/docs/context.html#context-module-api
        const control = key.match(/\/([^\/]+?)\/([^\/]+?)\/([^\/]+?)\.vue$/);
        let component_name = control[3];
        const dir_name = control[2];
        const lib_name = control[1];

        if (lib !== lib_name) {
            return;
        }

        const config = context(key);

        const lib_component_name = lib+'_'+component_name;

        if (!components[dir_name]) {
            components[dir_name] = {};
        }
        components[dir_name][component_name] = lib_component_name;
        flat_components[component_name] = lib_component_name;

        cache_components[lib].components[component_name] = config;

        Vue.component(
            lib_component_name,
            // Поиск опций компонента в `.default`, который будет существовать,
            // если компонент экспортирован с помощью `export default`,
            // иначе будет использован корневой уровень модуля.
            config.default || config
        )
    });

    cache_components[lib].component_names = components;
    cache_components[lib].flat_component_names = flat_components;

    return cache_components[lib];
}

export default loadComponents;
