<template>
    <div class="row">
        <div class="col-md-8">
            <div style="position:relative;padding-bottom:12px">
                <h2 class="float-left" style="color:white">List of Goals</h2>
                <div class="text-right">
                    <b-button-group>
                        <b-btn variant="warning">Active</b-btn>
                        <b-btn variant="primary">Archieved</b-btn>
                    </b-button-group>
                </div>
            </div>
            <div class="list-goals">
                <div v-if="lists.request" class="box">
                    <clip-loader></clip-loader>
                </div>
                <div v-else-if="lists.data.length === 0" class="box box--flex" style="justify-content:center;align-items:center;height:150px;flex-direction:column">
                    <div class="text-center">
                        <div><icon name="plus" base-class="icon-xl"></icon></div>
                        <b-btn v-b-modal.modal1 size="lg" variant="primary">Create Your Goal Now</b-btn>
                    </div>
                </div>
                <div v-else class="box" v-for="(list,key) in lists.data" :key="key">
                <transition name="fade">
                    <div class="box--flex">
                        <div class="image-goal">
                            <img src="/images/target.svg" alt="" class="rounded-circle">
                        </div>
                        <div class="detail-goal">
                            <div class="title">{{list.title}} - {{$options.rupiah(Number(list.cost))}}</div>
                                <b-progress :value="getProgress(list)" :max="Number(list.cost)" striped show-value class="mb-3"></b-progress>
                            <div>
                                <span class="text">
                                    <span :class="sisa(list).amount <= 0 && 'text-success'">{{sisa(list).text}}</span>
                                    <span v-if="sisa(list).amount > 0">
                                        - <b-btn v-b-modal.modal2 @click="selectList(list)" variant="link">Add Transaction</b-btn>
                                    </span>
                                </span>
                                <div class="box-actions float-right">
                                    <span><icon name="edit"></icon></span>
                                    <span @click="remove(list)"><icon name="trash-2"></icon></span>
                                    <span><icon name="package"></icon></span>
                                    <span><icon name="database"></icon></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                </div>
                <modal-create-transaction></modal-create-transaction>
            </div>
        </div>
        <div class="col-md-4">
            <navigation></navigation>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
transition: opacity .5s
}
.fade-enter, .fade-leave-active {
opacity: 0
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import rupiah from '../utils/currency';
import { getTotal } from '../utils/other';

export default {
    rupiah,
    name:'home',
    data(){
        return {
            option: {
                key: null,
                visible: false
            }

        }
    },
    computed: {
        ...mapGetters({
            lists: 'goal/index'
        }),
    },
    methods: {
        ...mapActions({
            fetchGoal: 'goal/fetchIndex',
            remove: 'goal/destroy',
            selectList: 'transaction/selectList',
        }),
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
        getProgress(data){
            if(data.transactions.length === 0){
                return 0;
            }
            return getTotal(data.transactions);
        },
        sisa(data){
            const sisa = Number(data.cost) - this.getProgress(data);
            return {
                amount: sisa,
                text: sisa <= 0 ? 'Tercapai!' : rupiah(sisa) + ' lagi'
            };
        }
    },
    watch: {
        ['lists.refresh'](){
            this.fetchGoal();
        }
    },
    mounted(){
        this.fetchGoal();
    }
}
</script>

