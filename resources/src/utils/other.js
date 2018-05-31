const check = (trx) => {
    if(trx.type === 'expenditure'){
        return -Number(trx.amount);
    }
    return Number(trx.amount);
}

export const getTotal = (transaction = []) => {
    const {max, min} = Math;
    if(transaction.length <= 1){
        return Number(transaction[0].amount);
    }
    transaction = _.map(transaction, trx => check(trx));
    return _.reduce(transaction, function(trx1, trx2){
        return trx1+trx2;
    })
}
