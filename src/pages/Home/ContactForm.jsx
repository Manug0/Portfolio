import styled from "styled-components";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";

const FormSection = styled.section`
	padding: 2rem 1rem;
	background-color: var(--bg-color);
`;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 500px;
	margin: 0 auto;
`;

const FormTitle = styled.h2`
	font-size: 2rem;
	color: var(--primary-color);
	margin-bottom: 1rem;
	text-align: center;
`;

const FormInput = styled.input`
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	border: 1px solid var(--text-color);
	border-radius: 4px;
	color: var(--text-input-color);
`;

const FormTextArea = styled.textarea`
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	border: 1px solid var(--text-color);
	border-radius: 4px;
	min-height: 100px;
`;

const FormButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	width: 50%;
	margin: auto;

	&:hover {
		background-color: var(--secondary-color);
	}
`;

const ErrorMessage = styled.span`
	color: red;
	font-size: 1rem;
	margin-bottom: 0.5rem;
`;

const ConfirmationMessage = styled.p`
	display: flex;
	gap: 8px;
	align-items: center;
	color: #00a500;
	margin-top: 1rem;
	font-size: 1rem;
	text-align: center;
`;

const ContactForm = () => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		emailjs
			.send(
				"service_190801",
				"template_b8i6517",
				{
					from_name: data.name,
					from_email: data.email,
					message: data.message,
				},
				"rMN3ao-jFpJxWP7ij"
			)
			.then(
				(result) => {
					console.log(result.text);
					setShowConfirmation(true);
					reset();
					setTimeout(() => setShowConfirmation(false), 5000);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	return (
		<FormSection>
			<FormContainer onSubmit={handleSubmit(onSubmit)}>
				<FormTitle>Contacta conmigo</FormTitle>
				<FormInput
					{...register("name", { required: "El nombre es requerido" })}
					placeholder="Tu nombre"
				/>
				{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

				<FormInput
					{...register("email", {
						required: "El email es requerido",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Email inválido",
						},
					})}
					placeholder="Tu email"
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

				<FormTextArea
					{...register("message", { required: "El mensaje es requerido" })}
					placeholder="Tu mensaje"
				/>
				{errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}

				<FormButton type="submit">Enviar</FormButton>
			</FormContainer>
			{showConfirmation && (
				<Flex style={{ justifyContent: "center" }}>
					<ConfirmationMessage>
						¡Mensaje enviado con éxito! <FaCheck style={{ color: "green", fontSize: "20px" }} />
					</ConfirmationMessage>
				</Flex>
			)}
		</FormSection>
	);
};

export default ContactForm;
