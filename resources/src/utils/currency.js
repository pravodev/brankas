import rupiah from 'rupiah-format';

export default (num) => {
    return rupiah.convert(num)
}
