export default async function ({ store, redirect, app, $axios }) {
    if (store.state.auth.currentUser) {
        redirect({ name: 'booking' })
    }
}