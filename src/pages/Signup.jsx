// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSignupMutation } from "../features/auth/authApi";
import { translate } from "../utils/translate";
import * as yup from "yup";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaUser , FaEnvelope, FaLock } from "react-icons/fa";
import i18n from "../utils/i18n";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [signup, { isLoading }] = useSignupMutation();
    const [language, setLanguage] = useState(i18n.language); // Track language state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            await signup(data);
            toast.success(translate("auth.signup.success"));
            navigate("/login");
        } catch (err) {
            toast.error(err.message || translate("auth.signup.error"));
        }
    };

    // Listen for language change
    useEffect(() => {
        const handleLanguageChange = () => setLanguage(i18n.language);
        i18n.on("languageChanged", handleLanguageChange);
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, []);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg p-4 w-50" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center text-primary mb-4">{translate("auth.signup.title")}</h2>
                    {isLoading && <Loader />} {/* Optional Loader component */}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>{translate("auth.signup.name")}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaUser  /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    {...register("name")}
                                    isInvalid={!!errors.name}
                                    placeholder={translate("auth.signup.namePlaceholder")}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{translate("auth.signup.email")}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    {...register("email")}
                                    isInvalid={!!errors.email}
                                    placeholder={translate("auth.signup.emailPlaceholder")}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{translate("auth.signup.password")}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaLock /></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    {...register("password")}
                                    isInvalid={!!errors.password}
                                    placeholder={translate("auth.signup.passwordPlaceholder")}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? translate("auth.signup.loading") : translate("auth.signup.submit")}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Signup;