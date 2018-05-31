<template>
    <b-modal id="modal1" title="Create a Goal" size="lg">
        <b-card no-body>
            <b-tabs pills card :vertical="$mq.resize && $mq.above(922)">
                <b-tab title="Create a Goal" active>
                    <b-form-group
                        v-for="(option, key) in $options.formGoal" :key="key"
                        :id="'fieldset'+key"
                        :label="option.name === 'cost' ? option.label + convert('cost') : option.label"
                        :label-for="option.name"
                    >
                        <b-form-textarea
                            v-if="option.type === 'textarea'"
                            :id="option.name"
                            :rows="3"
                            :max-rows="6"
                            v-model="input[option.name]"
                        >
                        </b-form-textarea>
                        <b-form-file
                            accept="image/*"
                            v-else-if="option.type === 'file'"
                            v-model="input[option.name]"
                            :id="option.name"
                        >
                        </b-form-file>
                        <b-form-input
                            v-else
                            :id="option.name"
                            :type="option.type"
                            v-model="input[option.name]"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                            asdasdasdasd
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-tab>
                <b-tab title="Set Target">
                    <b-row>
                        <b-col md="6">
                            <b-form-group
                                id="fieldset3"
                                label="Start Date"
                                label-for="start_date"
                            >
                                <b-form-input id="start_date" type="date" v-model="input.start_date"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group
                                id="fieldset3"
                                label="End Date"
                                label-for="end_date"
                            >
                                <b-form-input id="end_date" type="date" v-model="input.end_date"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                id="fieldset3"
                                :label="'Amount to Save' + convert('amount_to_save')"
                                label-for="amount-to-save"
                            >
                                <b-form-input id="amount-to-save" type="number" v-model="input.amount_to_save"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                id="fieldset3"
                                label="Pick Schedule"
                                label-for="pick-schedule"
                            >
                                <b-form-select id="pick-schedule" :options="$options.pickSchedule" v-model="input.pick_schedule"></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>
        <div slot="modal-footer" class="w-100">
            <b-btn class="float-right" variant="primary" @click="createGoal(input)">
                Save
            </b-btn>
        </div>
    </b-modal>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import rupiah from 'rupiah-format';
import axios from 'axios';

export default {
    name: 'create-goal',
    formGoal: [
        {
            type: 'text',
            label: 'Title',
            name: 'title'
        },
        {
            type: 'number',
            label: 'Cost',
            name: 'cost'
        },
        {
            type: 'textarea',
            label: 'Description',
            name: 'description',
        },
        {
            type: 'file',
            label: 'Image',
            name: 'image'
        }
    ],
    pickSchedule: [
        { value: null, text: '-' },
        { value: 'daily', text: 'Daily' },
        { value: 'weekly', text: 'Weekly' },
        { value: 'monthly', text: 'Monthly'},
    ],
    props: {
        edit: {
            type: Boolean,
            default: false
        }
    },
    computed: mapState({
        input: ({goal}) => goal.input
    }),
    methods: {
        ...mapActions({
            createGoal: 'goal/store',
        }),
        convert(key){
            const cost = rupiah.convert(this.input[key])
            if(_.isEmpty(this.input[key])){
                return ''
            }
            return ': ' + cost;
        }
    }
}
</script>
