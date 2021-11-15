export const state = () => ({
    message: {
        button: {
            color: 'success'
        },
        text: null,
        value: false
    },
    loading: false,
    statusTourItems: ['Draft', 'Public'],
    statusBookingItems: ['Submitted', 'Confirmed', 'Cancelled'],
    statusGeneralItems: ['Enabled', 'Disabled'],
})

export const mutations = {
    SET_ERROR_MESSAGE(state, text) {
        state.message.button.color = 'error'
        state.message.text = text
        state.message.value = true
    },
    SET_SUCCESS_MESSAGE(state, text) {
        state.message.button.color = 'success'
        state.message.text = text
        state.message.value = true
    },
    SET_LOADING(state, flag) {
        state.loading = flag
    },
}