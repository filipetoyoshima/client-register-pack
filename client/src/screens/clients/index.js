import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import req from './../../requests';
import { logout, getAuth } from './../../services/auth';
import DeleteModal from '../../components/deleteModal';
import ClientCard from './../../components/clientCard';

class ClientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            isModalOpen: false,
            willDelete: null,
        }
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.endSession = this.endSession.bind(this);
    }

    openDeleteModal(clientToDelete) {
        this.setState({
            willDelete: clientToDelete,
            isModalOpen: true,
        })
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
        })
    }

    deleteClient() {
        axios.delete(
            req.client,
            {
                headers: getAuth(),
                data: {
                    cpf: this.state.willDelete
                }
            }
        )
            .then(response => {
                this.componentDidMount();
            })
            .catch(err => {
                alert(err);
            })
        this.closeModal();
    }

    componentDidMount() {
        axios.get(req.client, {
            headers: getAuth()
        })
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

    endSession() {
        logout();
        this.props.history.push('/login');
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
                    <Link
                        className='btn btn-primary'
                        to='/new_client'
                        style={{margin: '5px'}}
                    >
                        Novo Cliente
                    </Link>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={this.endSession}
                        style={{margin: '5px'}}
                    >
                        Logout
                    </button>
                </div>
                <div className=''>
                    {this.state.clients.map((client, i) => 
                        <ClientCard
                            key={`client ${i}`}
                            client={client}
                            openModal={this.openDeleteModal}
                        />
                    )}
                </div>
                <DeleteModal
                    show={this.state.isModalOpen}
                    close={this.closeModal}
                    delete={this.deleteClient}
                />
            </div>
        )
    }
}

export default withRouter(ClientsScreen);