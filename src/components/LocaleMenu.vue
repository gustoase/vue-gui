<template>
    <v-menu offset-y>
        <v-btn icon slot="activator">
            <v-avatar tile size="45">
                <img :src="require(`@/assets/${current_locale}.png`)">
            </v-avatar>
        </v-btn>
        <v-list>
            <v-list-tile
                    v-for="(item, index) in locales"
                    :key="index"
                    @click="setLocale(item)"
            >
                <v-list-tile-avatar tile>
                    <img :src="require(`@/assets/${item}.png`)">
                </v-list-tile-avatar>
                <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import { mapMutations,mapState } from 'vuex';

    export default {
        name: "LocaleMenu",
        computed: {
            ...mapState([
                'current_locale',
                'locales',
            ])
        },
        watch: {
            current_locale(locale) {
                this.$i18n.locale = locale;
                this.$cookie.set('locale', locale);
            }
        },
        methods: {
            ...mapMutations([
                'setCurrentLocale'
            ]),
            setLocale(locale) {
                this.setCurrentLocale(locale);
            }
        },
        mounted() {
            const cookie_lang = this.$cookie.get('locale');
            if (cookie_lang) {
                this.setCurrentLocale(cookie_lang);
            }
        }
    }
</script>
