import { VTextField, VSlider, VSelect} from 'vuetify/lib';
export default {
    // Настройки каждого из контрола, использовать библиотеку vuetify, params - это доступные параметры для компонента vuetify
    // Settings for each control, use the vuetify library, params are the available options for the vuetify component
    configurator: {
        Flex: {
            size: { // size - св-во которое передается в props компоненту / properties that are passed to the props component
                value: 6,
                control: VSlider,
                label: 'size', // locale name in en.json
                params: {
                    'thumb-size': 24,
                    'thumb-label': true,
                    'max': 12,
                    'min': 1,
                }
            }
        },
        TextField: {
            value: {
                value: '',
                control: VTextField,
                label: 'text', // locale name in en.json
                params: {}
            },
            label: {
                value: '',
                control: VTextField,
                label: 'label',
                params: {
                    placeholder: 'label'
                }
            }
        },
        TextArea: {
            text: {
                value: '',
                control: VTextField,
                label: 'text',
                params: {}
            },
            label: {
                value: '',
                control: VTextField,
                label: 'label',
                params: {}
            },
            hint: {
                value: '',
                control: VTextField,
                label: 'description',
                params: {}
            }
        },
        Button: {
            color: {
                value: 'info',
                control: VSelect,
                label: 'color',
                params: {
                    items: [
                        'success',
                        'error',
                        'warning',
                        'info',
                    ]
                }
            },
            value: {
                value: 'Text value',
                control: VTextField,
                label: 'text',
                params: {}
            }
        },
        Checkbox: {
            label: {
                value: '',
                control: VTextField,
                label: 'label',
                params: {}
            },
            value: {
                value: 'value',
                control: VTextField,
                label: 'value',
                params: {}
            }
        },
        Img: {
            src: {
                value: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
                control: VTextField,
                label: 'resource',
                params: {}
            }
        },
        Card: {
            width: {
                value: '',
                control: VTextField,
                label: 'width',
                params: {}
            }
        },
        CardTitle: {
            title: {
                value: '',
                control: VTextField,
                label: 'text',
                params: {}
            }
        }
    },
    // Конфигурационные параметры для контролов которые работают с редактором
    // Configuration parameters for controls that work with the editor
    info: {
        Button: {
            is_nested: false, // required
        },
        Checkbox: {
            is_nested: false
        },
        TextArea: {
            is_nested: false
        },
        TextField: {
            is_nested: false
        },
        Container: {
            is_nested: true
        },
        Flex: {
            is_nested: true,
            default_config: { // optional
                size: 6
            }
        },
        Layout: {
            is_nested: true
        },
        Card: {
            is_nested: true
        },
        CardActions: {
            is_nested: true
        },
        CardTitle: {
            is_nested: true
        },
        Div: {
            is_nested: true
        },
        Img: {
            is_nested: false
        },
    },
    // Нормальные названия для директорий компонентов
    // Normal names for component directories
    alias_dirs: { // required
        control: 'controls', // controls - locale name in en.json
        grid: 'grid',
        widget: 'widget',
    }
}
