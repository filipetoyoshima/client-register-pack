import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { FaTrash } from 'react-icons/fa';
import ValidationSchema from './validationSchema';
import { Link, withRouter } from 'react-router-dom';

class ClientForm extends React.Component {

    render() {
        let initialValues = {
            name: '',
            email: '',
            cpf: '',
            addresses: [],
        }

        if(this.props.initialValues) {
            initialValues = this.props.initialValues;
        }

        return (
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={ async (values, { setSubmitting, setErrors }) => {
                    let success = await this.props.onSubmit(values);
                    if (success) {
                        console.log(this.props.history);
                        this.props.history.push('/client');
                    }
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting
                }) => (
                        <Form className='container text-left'>
                            <div className='form-group'>
                                <label htmlFor='name'>Nome</label>
                                <Field
                                    name='name'
                                    placeholder='Maria Silva'
                                    className={`form-control ${
                                        touched.name && errors.name ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component='div'
                                    name='name'
                                    className='invalid-feedback'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>E-mail</label>
                                <Field
                                    name='email'
                                    placeholder='maria.silva@email.com'
                                    className={`form-control ${
                                        touched.email && errors.email ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component='div'
                                    name='email'
                                    className='invalid-feedback'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='cpf'>CPF</label>
                                <Field
                                    name='cpf'
                                    placeholder='12312312300'
                                    className={`form-control ${
                                        touched.cpf && errors.cpf ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component='div'
                                    name='cpf'
                                    className='invalid-feedback'
                                />
                            </div>
                            <div className='card'>
                                <div className='card-header'>
                                    <span>Endereços</span>
                                </div>
                                <div className='card-body text-center'>
                                    <FieldArray
                                    name="addresses"
                                    render={(arrayHelpers) => (
                                        <>
                                            {values.addresses.map((address, index) => {

                                                // Check if the addresses values has errors
                                                // The usual way is not an option due to
                                                // touched.address returning undefined when not touched
                                                // so touched.address[index] throw an exception
                                                var numberValid = ''
                                                try {
                                                    if (touched.addresses[index].number && errors.addresses[index].number) {
                                                        numberValid = 'is-invalid';
                                                    }
                                                } catch { }

                                                var cepValid = ''
                                                try {
                                                    if (touched.addresses[index].cep && errors.addresses[index].cep) {
                                                        cepValid = 'is-invalid';
                                                    }
                                                } catch { }

                                                return (
                                                    <div
                                                        key={`addess.${index}`}
                                                        className='card text-left'
                                                        style={{
                                                            marginTop: '14px',
                                                            marginBottom: '14px',
                                                        }}
                                                    >
                                                        <div className='card-header'>
                                                            <span>
                                                                {`Endereço ${index + 1}`}
                                                            </span>
                                                            <button
                                                                type='button'
                                                                className='btn btn-danger'
                                                                style={{
                                                                    height: '25px',
                                                                    padding: 0,
                                                                    width: '25px',
                                                                    float: 'right',
                                                                    margin: '0 3px 0 3px',
                                                                }}
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                <FaTrash
                                                                    style={{
                                                                        margin: '-4px -0.5px 0 0'
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className='card-body'>
                                                            <div className='row'>
                                                                <div className='form-group col'>
                                                                    <label
                                                                        htmlFor={`addresses.${index}.number`}
                                                                    >
                                                                        Número
                                                                    </label>
                                                                    <Field
                                                                        name={`addresses.${index}.number`}
                                                                        placeholder='23'
                                                                        type='number'
                                                                        className={`form-control ${numberValid}`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component='div'
                                                                        name={`addresses.${index}.number`}
                                                                        className='invalid-feedback'
                                                                    />
                                                                </div>

                                                                <div className='form-group col'>
                                                                    <label
                                                                        htmlFor={`addresses.${index}.cep`}
                                                                    >
                                                                        CEP
                                                                    </label>
                                                                    <Field
                                                                        name={`addresses.${index}.cep`}
                                                                        placeholder='1234512'
                                                                        className={`form-control ${cepValid}`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component='div'
                                                                        name={`addresses.${index}.cep`}
                                                                        className='invalid-feedback'
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className='form-group'>
                                                                <label
                                                                    htmlFor={`addresses.${index}.complement`}
                                                                >
                                                                    Complemento
                                                                </label>
                                                                <Field
                                                                    name={`addresses.${index}.complement`}
                                                                    placeholder='Bloco A, 8º andar'
                                                                    className='form-control'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>)
                                            })}
                                            <button
                                                type='button'
                                                className='btn btn-success'
                                                onClick={() => arrayHelpers.push({
                                                    number: '',
                                                    cep: '',
                                                    complement: '',
                                                })}
                                            >
                                                Adicionar Endereço
                                            </button>
                                        </>
                                    )}
                                />
                                </div>
                            </div>
                            
                            <div style={{margin: '20px 0 30px 0'}}>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={isSubmitting}
                                    style={{
                                        float: 'right',
                                        width: '100px',
                                    }}
                                >
                                    {isSubmitting ?
                                        "Enviando..."
                                        :
                                        "Enviar"
                                    }
                                </button>
                                <Link
                                    className='btn btn-secondary'
                                    to='/client'
                                    style={{
                                        float: 'left',
                                    }}
                                >
                                    Voltar
                                </Link>
                            </div>

                        </Form>
                    )}
            </Formik>
        )
    }
}

export default withRouter(ClientForm);