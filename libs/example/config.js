import { VTextField, VSlider, VSelect} from 'vuetify/lib';
export default {
    // Настройки каждого из контрола, использовать библиотеку vuetify, params - это доступные параметры для компонента vuetify
    // Settings for each control, use the vuetify library, params are the available options for the vuetify component
    configurator: {
        Col: {
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
        Input: {
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
            },
            description: {
                value: '',
                control: VTextField,
                label: 'description',
                params: {}
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
            description: {
                value: '',
                control: VTextField,
                label: 'description',
                params: {}
            }
        },
        Button: {
            color: {
                value: 'btn-primary',
                control: VSelect,
                label: 'color',
                params: {
                    items: [
                        'btn-default',
                        'btn-primary'
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
        Radio: {
            label: {
                value: '',
                control: VTextField,
                label: 'label',
                params: {}
            }
        },
        Fieldset: {
            legend: {
                value: '',
                control: VTextField,
                label: 'legend',
                params: {
                    placeholder: 'Legend fieldset'
                }
            }
        }
    },
    // Конфигурационные параметры для контролов которые работают с редактором
    // Configuration parameters for controls that work with the editor
    info: {
        Col: {
            is_nested: true, // required
            default_config: { // optional
                size: 6
            }
        },
        Row: {
            is_nested: true
        },
        FormInline: {
            is_nested: true
        },
        FormInlineComb: {
            is_nested: true
        },
        FormComb: {
            is_nested: true
        },
        Fieldset: {
            is_nested: true
        },
        Div: {
            is_nested: true
        },
        Input: {
            is_nested: false
        },
        TextArea: {
            is_nested: false
        },
        Button: {
            is_nested: false
        },
        Radio: {
            is_nested: false
        },
    },
    // Нормальные названия для директорий компонентов
    // Normal names for component directories
    alias_dirs: { // required
        control: 'controls', // controls - locale name in en.json
        grid: 'grid',
    }
}
