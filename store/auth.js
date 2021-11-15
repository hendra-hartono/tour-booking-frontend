export const state = () => ({
    currentUser: null,
})

export const mutations = {
    SET_CURRENT_USER(state, user) {
        state.currentUser = user
        this.$axios.defaults.headers.common['token'] = user.token

        if (process.client) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
}

export const actions = {
    getCurrentUser({ commit }) {
        return this.$axios.get('/api/currentuser').then(response => {
            //console.log(response.data)
            commit('SET_CURRENT_USER', response.data.currentUser)
        });
    },

    login({ commit }, data) {
        return this.$axios.post('/api/login', data).then(response => {
            // console.log(response.data);
            commit('SET_CURRENT_USER', response.data)
        });
    }
}