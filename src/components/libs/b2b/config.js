import { VTextField, VSlider} from 'vuetify/lib';
export default {
    Col: {
        size: {
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
    Row: {
        backgroundColor: {
            value: 'red',
            control: VTextField,
            label: 'Цвет',
            params: {
                placeholder: 'Цвет'
            }
        }
    }
}
