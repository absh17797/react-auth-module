import React, { useState, useEffect } from "react";
import { useAppTranslation } from "../utils/translationHelper"; // Import the helper
import { useGetProfileQuery } from "../features/auth/authApi";
import { toast } from "react-toastify";
import { Container, Card, Table, Spinner } from "react-bootstrap";
import { translate } from "../utils/translate";
import i18n from "../utils/i18n";

const Profile = () => {
  const { data: user, error, isLoading } = useGetProfileQuery();
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

  if (error) {
    toast.error(translate("profile.errorLoadingProfile"));

    return (
      <div className="text-center text-danger mt-5">
        <h4></h4>
        <h4>{translate("profile.errorLoadingProfile")}</h4>
      </div>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="shadow-lg p-4 w-50">
        <Card.Body>
          <h2 className="text-center text-primary mb-4">👤 {translate("profile.details")}</h2>
          {user ? (
            <Table bordered hover className="text-center">
              <tbody>
                <tr>
                  <th className="bg-light">{translate("profile.id")}</th>
                  <td>{user.data.id}</td>
                </tr>
                <tr>
                  <th className="bg-light">{translate("profile.name")}</th>
                  <td>{user.data.name}</td>
                </tr>
                <tr>
                  <th className="bg-light">{translate("auth.login.email")}</th>
                  <td>{user.data.email}</td>
                </tr>
                {/* Add more details as needed */}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">{translate("profile.noDataAvailable")}</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
