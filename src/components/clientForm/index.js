import React from 'react';
import cpf from 'cpf';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const ClientSchema = Yup.object().shape({
    name: Yup.string()
        .matches(
            /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff']+( [a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff']+)*$/,
            "O nome deve conter apenas letras e apenas um espaço em branco entre palavras"
        )
        .required("Obrigatório"),
    
    email: Yup.string()
        .email("exemplo@mail.com")
        .required("Obrigatório"),
    
    cpf: Yup.string()
        .matches(
            /^[0-9]*$/,
            "Insira apenas números"
        )
        .required("Obrigatório")
        .test(
            'is-valid-cpf',
            'Não é um CPF válido',
            (value) => {return cpf.isValid(value)}
        ),
    
    addresses: Yup.array().of(
        Yup.object().shape({
            number: Yup.number()
                .integer("O número deve ser inteiro")
                .positive("Existe endereço negativo?")
                .required("Número obrigatório")
        })
    )
})

export default class ClientForm extends React.Component {

    render() {
        return (
            <Formik 
                initialValues={{
                    name: '',
                    email: '',
                    cpf: '',
                    addresses: [],
                }}
                validationSchema={ClientSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    console.log(values)
                    alert("Formulário validado!");
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting
                }) => (
                    <Form className='container'>
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

                        <FieldArray
                            name="addresses"
                            render={(arrayHelpers) => (
                                <>
                                {values.addresses.map((address, index) => {

                                    var numberValid = ''
                                    try {
                                        if (touched.addresses[index].number && errors.addresses[index].number) {
                                            numberValid = 'is-invalid';
                                        }
                                    } catch {}

                                    var cepValid = ''
                                    try {
                                        if (touched.addresses[index].number && errors.addresses[index].number) {
                                            cepValid = 'is-invalid';
                                        }
                                    } catch {}

                                    return (
                                    <div key={address.index}>
                                        <div className='form-group'>
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

                                        <div className='form-group'>
                                            <label
                                                htmlFor={`addresses.${index}.cep`}
                                            >
                                                CEP
                                            </label>
                                            <Field
                                                name={`addresses.${index}.cep`}
                                                type='number'
                                                placeholder='1234512'
                                                className='form-control'
                                            />
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
                                    </div> )
                                })}
                                <button
                                    type='button'
                                    className='btn btn-primary'
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

                        <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ?
                                "Enviando..."
                            :
                                "Enviar"
                            }
                        </button>
                        <pre>
                            {JSON.stringify(values, null, 2)}
                        </pre>
                        <pre>
                            {JSON.stringify(errors, null, 2)}
                        </pre>
                        <pre>
                            {JSON.stringify(touched, null, 2)}
                        </pre>
                    </Form>
                )}
            </Formik>
        )
    }
}