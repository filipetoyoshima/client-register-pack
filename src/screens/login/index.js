import React from 'react';

class LoginScreen extends React.Component {
    state = {}
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
                            <form>
                                <div className="form-group">
                                    <label>Nome de Usuário</label>
                                    <input
                                        className="form-control"
                                        placeholder="Inserir nome de usuário"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nome de Usuário</label>
                                    <input
                                        className="form-control"
                                        placeholder="Inserir nome de usuário"
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

export default LoginScreen;