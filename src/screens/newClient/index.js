import React from 'react'
import ClientForm from './../../components/clientForm';

export default class newClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className='container text-center'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Novo Cliente</h1>                    
                </div>
                <ClientForm/>
            </div>
        )
    }
}