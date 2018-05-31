export default {
    data: ({input, selected}, type) => {
        return _.assign({
            goal_id: selected.id
        }, input)
    }
}
