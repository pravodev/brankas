<template>
    <div class="box box--height">
        <h1>Transaction Records</h1>
        <transaction-record></transaction-record>
    </div>
</template>

<script>
export default {
    name:'setting',
    data(){
        return {
            samples: [
                'Beli Motor',
                'Naik Haji Ke Makkah',
                'Kamana Deui',
                'Lorem ipsum color damet dasw',
                'naon deui nya atuh wk'
            ],
            option: {
                key: null,
                visible: false
            }

        }
    },
    methods: {
        show_option(key){
            if(key !== this.option.key && this.option.visible){
                this.option.visible = false;
            }
            this.option = {
                key,
                visible: !this.option.visible
            }
            this.$forceUpdate()
        },
    },
    updated(){
        console.log(this.visible)
    }
}
</script>

