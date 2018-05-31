<template>
    <b-modal id="modal2" :title="'Create Transaction for ' + selected.title" size="md">
        <b-form-group
            id="fieldset3"
            label="Amount"
            label-for="amount"
        >
            <b-form-input
                id="amount"
                type="number"
                v-model="input.amount"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="fieldset4"
            label="Note"
            label-for="note"
        >

            <b-form-textarea
                id="note"
                v-model="input.note"
                :rows="3"
                :max-rows="6"
            >
            </b-form-textarea>
        </b-form-group>
        <b-form-group
            id="fieldset3"
            label="Date"
            label-for="date"
        >
            <b-form-input
                id="date"
                type="date"
                v-model="input.date"
            >
            </b-form-input>
        </b-form-group>
        <div slot="modal-footer" class="text-center">
            <b-btn class="float-right rounded-circle" variant="primary" @click="create(0)">
                <icon base-class="icon-lg" name="plus"></icon>
            </b-btn>
            <b-btn :disabled="disabled" class="float-right rounded-circle" variant="warning" @click="create(1)">
                <icon base-class="icon-lg" name="minus"></icon>
            </b-btn>
        </div>
    </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'transaction',
    computed: {
        ...mapState({
            selected: ({transaction}) => transaction.selected,
            input: ({transaction}) => transaction.input
        }),
        disabled(){
            return _.isEmpty(this.selected.transactions)
        }
    },
    methods: {
        ...mapActions({
            create: 'transaction/store'
        })

    }
}
</script>
