import React from 'react';
import axios from 'axios';

import req from './../../requests';
import DeleteModal from '../../components/deleteModal';
import ClientCard from './../../components/clientCard';

export default class ClientsScreen extends React.Component {
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
        console.log("will send delete requisition", this.state.willDelete)
    }

    componentDidMount() {
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