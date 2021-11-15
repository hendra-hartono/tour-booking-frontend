export const state = () => ({
    booking: {},
})

export const mutations = {
    SET_BOOKING(state, booking) {
        state.booking = booking
    },
}

export const actions = {
    getBookingById({ commit }, id) {
        return this.$axios.get('/api/bookings/' + id).then(response => {
            //commit('SET_BOOKING', response.data)
            return response.data
        })
    },
    createBooking({ commit }, data) {
        return this.$axios.post('/api/bookings', data).then(response => {
            console.log(response.data)
        })
    },
    updateBooking({ commit }, { id, data }) {
        return this.$axios.put('/api/bookings/' + id, data).then(response => {
            console.log(response.data)
        })
    },
}