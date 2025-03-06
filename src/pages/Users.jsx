import React, {useState, useEffect} from "react";
import { useGetUsersQuery } from "../features/auth/authApi";
import { Container, Card, Table, Spinner, Alert } from "react-bootstrap";
import { translate } from "../utils/translate";
import i18n from "../utils/i18n";

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery({ page: 1, limit: 10 });
  const [language, setLanguage] = useState(i18n.language); // Track language state

  // Listen for language change
  useEffect(() => {
    const handleLanguageChange = () => setLanguage(i18n.language);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          ❌ Error loading users
        </Alert>
      </Container>
    );

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-4 w-75">
        <Card.Body>
          <h2 className="text-center text-primary mb-4">👥 {translate("general.userList")}</h2>
          <Table bordered hover responsive className="text-center">
            <thead className="table-light">
              <tr>
                <th>{translate("profile.id")}</th>
                <th>{translate("profile.name")}</th>
                <th>{translate("auth.login.email")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.users?.map((user) => (
                <tr key={user._id}>
                  <td><b>{user._id}</b></td>
                  <td>{user.name}</td>
                  <td><em>{user.email}</em></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Users;