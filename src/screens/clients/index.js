import React from 'react';

import axios from 'axios';
import req from './../../requests';
import ClientCard from './../../components/clientCard';

export default class ClientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
        }
    }

    componentDidMount() {
        console.log(req.client);
        axios.get(req.client)
            .then(response => {
                console.log(response.data)
                this.setState({
                    clients: response.data,
                })
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {
        return (
            <div className='container'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Clientes Cadastrados</h1>
                    <button type='button' className='btn btn-primary'>
                        Novo Cliente
                    </button>
                </div>
                <div className=''>
                    {this.state.clients.map((client, i) => 
                        <ClientCard key={`client ${i}`} client={client}/>
                    )}
                </div>
            </div>
        )
    }
}