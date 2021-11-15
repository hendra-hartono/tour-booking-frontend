export const state = () => ({
    tour: {},
})

export const mutations = {
    SET_TOUR(state, tour) {
        state.tour = tour
    },
}

export const actions = {
    getTourById({ commit }, id) {
        return this.$axios.get('/api/tours/' + id).then(response => {
            //commit('SET_TOUR', response.data)
            return response.data
        })
    },
    createTour({ commit }, data) {
        return this.$axios.post('/api/tours', data).then(response => {
            console.log(response.data)
        })
    },
    updateTour({ commit }, { id, data }) {
        return this.$axios.put('/api/tours/' + id, data).then(response => {
            console.log(response.data)
        })
    },
    deleteTour({ commit }, id) {
        return this.$axios.delete('/api/tours/' + id).then(response => {
            console.log(response.data)
        })
    },
}