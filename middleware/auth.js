export default function ({ store, redirect, app }) {
  // If the user is not authenticated
  if (!store.state.user) {
    const lang = app.i18n.locale
    return redirect(`/${lang}/login/`)
  }
}
