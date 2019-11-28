import React from 'react';
import axios from 'axios';
import ClientForm from './../../components/clientForm';
import { withRouter } from 'react-router-dom';
import req from './../../requests';

class newClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = async function (values) {
        let allValues = {
            ...values,
            oldCpf: this.props.location.state.client.cpf,
        }
        try {
            const response = await axios.patch(
                req.client,
                allValues
            )
            console.log(response);
            return true;
        } catch {
            alert("Não foi possível atualizar o usuário");
            return false;
        }
    }

    render() {
        return (
            <div className='container text-center'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Editar Cliente</h1>
                </div>
                <ClientForm
                    initialValues={this.props.location.state.client}
                    onSubmit={this.submitForm}
                />
            </div>
        )
    }
}

export default withRouter(newClient)