export const state = () => ({
    tours: [],
    tour: {},
    dataTable: {
        items: [],
        value: [],
        loading: false,
        overlay: false,
        dense: false,
        showSelect: false,
        serverItemsLength: 0,
        options: {
            itemsPerPage: 10,
            page: 1,
            sortBy: [''],
            sortDesc: [true]
        },
        filter: {
            name: null,
            usertype: null,
        },
        headers: [
            {
                sortable: false,
                text: 'ID',
                value: 'id',
                visible: false,
                visibleDefault: false,
                visibleSelected: false
            },
            {
                sortable: false,
                text: 'NAME',
                value: 'name',
                visible: true,
                visibleDefault: true,
                visibleSelected: false
            },
            {
                sortable: false,
                text: 'ITINERARY',
                value: 'itinerary',
                visible: true,
                visibleDefault: true,
                visibleSelected: false
            },
            {
                sortable: false,
                text: 'STATUS',
                value: 'status',
                visible: true,
                visibleDefault: true,
                visibleSelected: false
            },
            {
                align: 'center',
                sortable: false,
                text: 'ACTIONS',
                value: 'actions',
                visible: true,
                visibleDefault: true,
                visibleSelected: true
            }
        ],
        footerProps: {
            itemsPerPageOptions: [10, 25, 50, 100],
            showFirstLastPage: true
        },
    },
    filter: {
        form: {
            field: {
                status: {
                    default: null,
                    value: null,
                    type: 'String',
                },
            }
        }
    }
})

export const getters = {
    getDataTableHeadersIsVisible(state) {
        return state.dataTable.headers.filter(h => h.visible)
    },
    getDataTableFilterIsNotNull(state) {
        return Object.assign(
            {},
            ...Object.keys(state.dataTable.filter)
                .filter(f => state.dataTable.filter[f] !== null)
                .filter(f => state.dataTable.filter[f] !== undefined)
                .map(f => {
                    return { [f]: state.dataTable.filter[f] }
                })
        )
    },
    getDataTableParams(state, getters) {
        return {
            ...{
                limit: state.dataTable.options.itemsPerPage,
                page: state.dataTable.options.page,
                orderBy: state.dataTable.options.sortBy.join(','),
                sortedBy: state.dataTable.options.sortDesc
                    .map(sd => {
                        return sd === true ? 'desc' : 'asc'
                    })
                    .join(','),
                uuid: Date.now()
            },
            ...getters.getDataTableFilterIsNotNull
        }
    }
}

export const mutations = {
    SET_TOURS(state, tours) {
        state.tours = tours
    },
    SET_TOUR(state, tour) {
        state.tour = tour
    },
    SET_DATATABLE(state, value) {
        state.dataTable = { ...state.dataTable, ...value }
    },
    SET_DATATABLE_FILTER(state, value) {
        state.dataTable.filter = {
            ...state.dataTable.filter,
            ...value
        }
    },
    SET_STATE_WITH_QUERY(state, query) {
        if (query) {
            Object.keys(state.dataTable.filter).forEach(f => {
                if (query[f] !== undefined) {
                    state.dataTable.filter[f] = query[f]
                }
            })
        }
        if (query.limit) {
            state.dataTable.options.itemsPerPage = Number(query.limit)
        }
        if (query.orderBy) {
            state.dataTable.options.sortBy = [query.orderBy]
        }
        if (query.sortedBy) {
            state.dataTable.options.sortDesc =
                query.sortedBy === 'desc' ? [true] : [false]
        }
        if (query.page) {
            state.dataTable.options.page = Number(query.page)
        }
        if (query) {
            Object.keys(state.filter.form.field).forEach(f => {
                if (query[f] !== undefined) {
                    if (state.filter.form.field[f].type === 'Boolean') {
                        state.filter.form.field[f].value = query[f] === 'true'
                    } else {
                        state.filter.form.field[f].value = query[f]
                    }
                }
            })
        }
    },
}

export const actions = {
    fetchTours({ commit }, params) {
        return this.$axios.get('/api/tours', params).then(response => {
            commit('SET_TOURS', response.data)
        })
    },
    fetchTour({ commit }, id) {
        return this.$axios.get('/api/tours/' + id).then(response => {
            commit('SET_TOUR', response.data)
        })
    },
    fetchDataTable({ commit, getters }) {
        commit('SET_DATATABLE', { loading: true })

        return this.$axios.get('/api/tours', { params: getters.getDataTableParams }).then(response => {
            commit('SET_DATATABLE', {
                items: response.data.data,
                loading: false,
                serverItemsLength: response.data.total
            })
        })
    },
    filterDataTable({ commit, dispatch, state }, params) {
        state.dataTable.options.page = 1

        Object.keys(state.filter.form.field).forEach(c => {
            commit('SET_DATATABLE_FILTER', { [c]: state.filter.form.field[c].value })
        })

        dispatch('fetchDataTable')
    },
}