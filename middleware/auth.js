export default async function ({ store, redirect, app, $axios }) {
    if (store.state.auth.currentUser === null) {
        redirect({ name: 'login' })
    }
}