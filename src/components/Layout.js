import React, { PureComponent } from 'react'
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import 'assets/scss/app.scss'; 


export default class Layout extends PureComponent {
  render () {
    return (
      <div className='layout'>
        <header>
          <Header/>
        </header>
        <main className="main-route pa25">
          { this.props.children }
        </main>
        <footer>
          <Footer/>
        </footer>
        <style jsx>{`
            .main-route {
              min-height: calc(100vh - 96px);
              background-color: #FAFAFA;
            }
          `}</style>
      </div>
    )
  }
}
