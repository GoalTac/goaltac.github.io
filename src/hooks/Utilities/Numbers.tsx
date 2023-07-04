export function formatNumber(val: Number) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}