import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import * as yup from "yup";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { translate } from "../utils/translate";
import i18n from "../utils/i18n";

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
    // Listen for language change
    useEffect(() => {
        const handleLanguageChange = () => setLanguage(i18n.language);
        i18n.on("languageChanged", handleLanguageChange);
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [language, setLanguage] = useState(i18n.language); // Track language state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const result = await login(data).unwrap();
            dispatch(
                setCredentials({
                    user: result.data.data,
                    token: result.data.token,
                })
            );
            toast.success(translate("auth.login.success"));
            navigate("/profile");
        } catch (err) {
            toast.error(translate("auth.login.error"));
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg p-4 w-50" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center text-primary mb-4">{translate("auth.login.title")}</h2>
                    {isLoading && <Loader />}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>{translate("auth.login.email")}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaUser /></InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    {...register("email")}
                                    isInvalid={!!errors.email}
                                    placeholder={translate("auth.login.emailPlaceholder")}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{translate("auth.login.password")}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaLock /></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    {...register("password")}
                                    isInvalid={!!errors.password}
                                    placeholder={translate("auth.login.passwordPlaceholder")}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? translate("auth.login.loading") : translate("auth.login.submit")}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
