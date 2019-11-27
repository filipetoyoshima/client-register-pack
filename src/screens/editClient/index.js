import React from 'react'
import ClientForm from './../../components/clientForm';
import { withRouter } from 'react-router-dom';

class newClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.location)

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
                />
            </div>
        )
    }
}

export default withRouter(newClient)