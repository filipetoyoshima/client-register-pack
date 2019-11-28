import cpf from 'cpf';
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
            (value) => { return cpf.isValid(value) }
        ),

    addresses: Yup.array().of(
        Yup.object().shape({
            number: Yup.number()
                .integer("O número deve ser inteiro")
                .positive("Existe endereço negativo?")
                .required("Número obrigatório"),

            cep: Yup.string()
                .matches(
                    /^[0-9]*$/,
                    "Insira apenas números"
                )
                .length(8, "CEP contém 8 números")
                .test(
                    'is-valid-cep',
                    'Não é um CEP existente',
                    async (value) => {
                        if(!value) return false
                        if(value.length !== 8) return false
                        const url = `https://viacep.com.br/ws/${value}/json/`;
                        try {
                            const response = await fetch(url)
                            const data = await response.json()
                            if (data.erro) {
                                return false;
                            } else {
                                return true;
                            }
                        } catch {}
                    }
                )
        })
    )
})

export default ClientSchema;