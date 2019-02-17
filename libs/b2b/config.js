import { VTextField, VSlider, VSelect} from 'vuetify/lib';
export default {
    // Настройки каждого из контрола, использовать библиотеку vuetify, params - это доступные параметры для компонента vuetify
    configurator: {
        Col: {
            size: { // size - св-во которое передается в props компоненту
                value: 6,
                control: VSlider,
                label: 'Размер',
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
                label: 'Текст',
                params: {
                    placeholder: 'Текст'
                }
            },
            label: {
                value: '',
                control: VTextField,
                label: 'Лейбл',
                params: {
                    placeholder: 'Лейбл'
                }
            },
            description: {
                value: '',
                control: VTextField,
                label: 'Описание',
                params: {
                    placeholder: 'Описание'
                }
            }
        },
        TextArea: {
            text: {
                value: '',
                control: VTextField,
                label: 'Текст',
                params: {
                    placeholder: 'Текст'
                }
            },
            label: {
                value: '',
                control: VTextField,
                label: 'Лейбл',
                params: {
                    placeholder: 'Лейбл'
                }
            },
            description: {
                value: '',
                control: VTextField,
                label: 'Описание',
                params: {
                    placeholder: 'Описание'
                }
            }
        },
        Button: {
            color: {
                value: 'btn-primary',
                control: VSelect,
                label: 'Цвет',
                params: {
                    items: [
                        'btn-default',
                        'btn-primary'
                    ]
                }
            },
            value: {
                value: 'Текст',
                control: VTextField,
                label: 'Текст',
                params: {
                    placeholder: 'Текст'
                }
            }
        },
        Radio: {
            label: {
                value: '',
                control: VTextField,
                label: 'Лейбл',
                params: {
                    placeholder: 'Лейбл'
                }
            }
        },
        Fieldset: {
            legend: {
                value: '',
                control: VTextField,
                label: 'Легенда',
                params: {
                    placeholder: 'Легенда'
                }
            }
        }
    },
    // Конфигурационные параметры для контролов которые работают с редактором
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
    alias_dirs: { // required
        control: 'Контролы',
        grid: 'Сетка',
    }
}
