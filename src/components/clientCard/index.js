import React from 'react'

import { MdModeEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import styles from './styles';

export default class ClientCard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    } 

    render() {
        let client = this.props.client;
        console.log(client);
        
        return (
            <div 
                className='card'
                style={styles.title}
            >
                <div className='card-header justify-content-between'>
                    <span style={styles.cardTitle}>
                        Nome: {client.name}
                    </span>
                    <button
                        type='button'
                        className='btn btn-danger'
                        style={styles.button}
                    >
                        <FaTrash
                            style={{
                                margin: '-4px -0.5px 0 0'
                            }}
                        />
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        style={styles.button}
                    >
                        <MdModeEdit
                            style={{
                                marginTop: '-4px'
                            }}
                        />
                    </button>
                </div>
                <div className='card-body row'>
                    <div className='col'>
                        <span>
                            CPF: {client.cpf}
                        </span>
                    </div>
                    <div className='col'>
                        <span>
                            Email: {client.email}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}