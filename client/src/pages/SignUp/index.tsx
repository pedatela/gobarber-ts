import React, {useCallback, useRef}  from "react";
import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from 'yup'

// API
import api from '../../services/api';

// Icons
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

// Toast
import { useToast } from '../../hooks/Toast';

// Images
import logoImg from '../../assets/logo.svg'

// Components
import Input from "../../components/input";
import Button from "../../components/button";

// Utils
import getValidationErrors from "../../utils/getValidationsErrors";

// Styles
import { Container, Content, AnimationContainer, Background } from "./styles";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

const SignUp: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatorio'),
                email: Yup.string().required('Email é obrigatorio').email('Digite um email valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            }) 

            await schema.validate(data, {abortEarly: false})
            await api.post('/users', data);
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!',
            });
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            addToast({
                type: 'error',
                title: 'Erro na cadastro',
                description: 'Ocorreu um error ao fazer cadastro, tente novamente.',
            });
        }
    },[addToast, history])

    return(
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber"></img>

                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Faça seu Cadastro</h1>

                        <Input name="name" icon={FiUser} placeholder="Nome" />

                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                        <Button type="submit">Cadastrar</Button>

                    </Form >
                    <Link to="/"> <FiArrowLeft /> Voltar para Logon</Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
};

export default SignUp;