import React, { Component } from 'react';
import Header from '../../layouts/frontend/Header';
import Navbar from '../../layouts/frontend/Navbar';
import ScrollButton from '../../layouts/frontend/ScrollButton';
import Footer from '../../layouts/frontend/Footer';
import ContentMenu from './ContentMenu/ContentMenu';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <ContentMenu />
                <ScrollButton />
                <Footer />
            </div>
        );
    }
}

export default Home;