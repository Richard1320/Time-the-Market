import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import './scss/app.scss';
import {fetchData} from './redux/actions';

import LineChart from './components/LineChart';
import Form from './components/Form';
import Summary from './components/Summary';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div className="App">
            <Header/>
            <Form/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <LineChart/>
                    </div>
                    <div className="col-12 col-lg-4">
                        <Summary/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

};

export default App;