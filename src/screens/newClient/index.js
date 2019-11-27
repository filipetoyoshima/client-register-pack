import React from 'react';
import axios from 'axios';
import ClientForm from './../../components/clientForm';
import { withRouter } from 'react-router-dom'; 
import req from './../../requests';

class newClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitForm = async function (values) {
        try {
            const response = await axios.post(
                req.client,
                values
            )
            console.log(response);
        } catch {
            alert("Não foi possível cadastrar o usuário");
        }
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
                <ClientForm onSubmit={this.submitForm}/>
            </div>
        )
    }
}

export default withRouter(newClient)