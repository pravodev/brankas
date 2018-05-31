<template>
<div>
    <table v-if="shortData.length == 0">
        <hr/>
        <div class="text-center">No Record Found! Please Make your goal first!</div>
    </table>
    <table v-else class="table table-sm">
        <tr v-if="fullVersion">
            <td>Nominal</td>
            <td>Goal</td>
        </tr>
        <tr
            v-for="(list, key) in shortData"
            :key="key"
        >
            <td v-if="list.type === 'income'" class="text-success">+ {{$options.rupiah(Number(list.amount))}}</td>
            <td v-else class="text-danger">- {{$options.rupiah(Number(list.amount))}}</td>
            <td>{{list.goal.title}}</td>
        </tr>
        <tr
            v-if="list.data.length > 7"
        >
            <td colspan="2" class="text-center"><b-link to="/records">See All Records</b-link></td>
        </tr>
    </table>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import rupiah from '../utils/currency';

export default {
    rupiah,
    name: 'transaction-record',
    props: {
        fullVersion: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions({
            fetchGoal: 'goal/fetchIndex',
            fetchTransaction: 'transaction/fetchIndex'
        }),
    },
    computed:{
        ...mapState({
            shortData: ({transaction}) => {
                return _.filter(transaction.list.data, function(data, index){
                    if(index < 7){
                        return data;
                    }
                })
            },
            list: ({transaction}) => transaction.list
        }),
    },
    watch: {
        ['list.refresh'](){
            this.fetchTransaction();
            this.fetchGoal();
        }
    },
    mounted(){
        this.fetchTransaction();
    }
}
</script>
