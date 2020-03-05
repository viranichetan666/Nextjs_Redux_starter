import { ThemeProvider, createGlobalStyle } from 'styled-components'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import styledNormalize from 'styled-normalize'
import { withRouter } from 'next/router'
import withReduxSaga from 'next-redux-saga'
import App from 'next/app'
import { PersistGate } from "redux-persist/integration/react";

import { makeStore } from './../src/store/createStore'
import Layout from './../src/components/Layout'
import theme from 'theme'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`

class MyApp extends App {
  render () {
    const { Component, pageProps, router, store } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
            <GlobalStyle />
            <Layout>
              <Component router={router} {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default withRedux(makeStore)(withRouter(MyApp))
