import React from 'react'

export default class ClientCard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    } 

    render() {
        let client = this.props.client;
        console.log(client);
        
        return (
            <div className='card'>
                <div className='card-header'>
                    {client.name}
                </div>
                <div className='card-body'>
                    {client.cpf}
                    {client.email}
                </div>
            </div>
        )
    }
}