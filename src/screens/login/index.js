import React from 'react';
import { withRouter } from 'react-router-dom'; 

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const field = event.target.name;

        this.setState({
            [field]: value,
        })
    }

    handleSubmit(event) {
        console.log(`This is a very beautiful state: ${this.state}`);
        event.preventDefault();
    }

    render() {
        return (
            <div
                className="row text-center align-items-center justify-content-center"
                style={{
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                }}
            >
                <div className="col-sm-8 col-11 my-auto">
                    <h1 className="bd-title">
                        Cadastro de Cliente
                    </h1>
                    <div className="card">
                        <div className="card-header">
                            <h2>Entre para continuar</h2>
                        </div>
                        <div className="card-body text-left">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Nome de Usuário</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        placeholder="Inserir nome de usuário"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Inserir nome de usuário"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginScreen);