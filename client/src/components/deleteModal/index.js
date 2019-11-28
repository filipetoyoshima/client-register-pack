import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class DeleteModal extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar deleção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Tem certeza de que você quer deletar esse cliente?
                        Ele será deletado <strong>permanentemente</strong>!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.props.close}
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.props.delete}
                    >
                        Deletar
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}