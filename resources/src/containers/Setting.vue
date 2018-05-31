<template>
    <div class="container">
        <div class="box box--height">
            <h1>Setting</h1>
            <div class="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis provident consequatur aut labore deleniti optio recusandae doloremque sint, consectetur magni! Cupiditate ducimus cumque mollitia suscipit? Excepturi culpa unde rem a!
                <br/>
                <div class="form-group row">
                    <label for="email" class="col-sm-3 col-form-label text-md-right">Email Address</label>
                    <div class="col-md-9">
                        <input id="email" type="email" class="form-control" name="email" value="">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-sm-3 col-form-label text-md-right">Password</label>
                    <div class="col-md-9">
                        <input id="password" type="password" class="form-control" name="password" value="">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="confirmation_password" class="col-sm-3 col-form-label text-md-right">Password Confirmation</label>
                    <div class="col-md-9">
                        <input id="confirmation_password" type="password" class="form-control" name="confirmation_password" value="">
                    </div>
                </div>
            </div>
        </div>
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

