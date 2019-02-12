import Vue from 'vue';

let cache_components = {};

function loadComponents(lib = '') {
    let components = {};

    if (!cache_components[lib]) {
        cache_components[lib] = {
            components: {},
            list_names: {}
        };
        console.log('create cache')
    } else {
        console.log('load from cache');
        return cache_components[lib].list_names;

        for (let component_name in cache_components[lib].components) {
            if (!cache_components[lib].components.hasOwnProperty(component_name)) continue;

            let config = cache_components[lib].components[component_name];
            Vue.component(
                component_name,
                // Поиск опций компонента в `.default`, который будет существовать,
                // если компонент экспортирован с помощью `export default`,
                // иначе будет использован корневой уровень модуля.
                config.default || config
            )
        }
    }

    console.log('load components from lib:', lib)
    const context = require.context('./components/libs', true, /\.vue$/)

    context.keys().forEach(function (key) { // see: https://webpack.github.io/docs/context.html#context-module-api

        const control = key.match(/\/([^\/]+?)\/([^\/]+?)\.vue$/);
        let component_name = control[2];
        const dir_name = control[1];
        const config = context(key);

        if (lib) {
            component_name = lib+'_'+component_name;
        }

        if (!components[dir_name]) {
            components[dir_name] = {};
        }
        components[dir_name][component_name] = component_name;

        cache_components[lib].components[component_name] = config;

        Vue.component(
            component_name,
            // Поиск опций компонента в `.default`, который будет существовать,
            // если компонент экспортирован с помощью `export default`,
            // иначе будет использован корневой уровень модуля.
            config.default || config
        )
    });



    cache_components[lib].list_names = components;

    return components;
}

export default loadComponents;
