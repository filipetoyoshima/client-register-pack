import React from 'react';
import cpf from 'cpf';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ClientSchema = Yup.object().shape({
    name: Yup.string()
        .matches(
            /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\']+( [a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\']+)*$/,
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
                }}
                validationSchema={ClientSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    console.log(values)
                    alert("Formulário validado!");
                    setSubmitting(false);
                }}
            >
                {({
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
                    </Form>
                )}
            </Formik>
        )
    }
}