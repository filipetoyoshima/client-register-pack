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
            <div>
                {this.state.clients.map((client, i) => 
                    <div key={`${i} value`}>
                        <ClientCard client={client}/>
                    </div>
                )}
            </div>
        )
    }
}