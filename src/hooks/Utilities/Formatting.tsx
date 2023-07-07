export function formatNumber(val: Number | String) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}