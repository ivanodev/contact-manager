import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contact_ms, request_header } from "../../services/HttpServer";
import { getAxiosErrorMessage } from "../../utils/ErrorUtil";
import {
  Button,
  ButtonContainer,
  Container,
  Form,
  FormField,
  Header,
} from "./styles";

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Record {
  id?: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
}

const ContactEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contact, setContact] = useState<Record>({
    id: "",
    name: "",
    address: {
      street: "",
      number: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (location.state && location.state.contactId) {
      const fetchContact = async () => {
        try {
          const response = await contact_ms.get(`/find-id/${location.state.contactId}`, { headers: request_header()});
          setContact(response.data);
        } catch (error) {
          let message = getAxiosErrorMessage(error);
          alert(message);
        }
      };
      fetchContact();
    }
  }, [location.state]);

  const handleSave = async () => {
    if (isFormValid()) {
      try {
        if (contact.id) {
          await contact_ms.put("/update", contact, { headers: request_header() });
          alert("Contact saved successfully.");
        } else {
          await contact_ms.post("/new", contact, { headers: request_header() });
          alert("Contact created successfully.");
        }
        navigate("/contacts");
      } catch (error) {
        let message = getAxiosErrorMessage(error);
        alert(message);
      }
    }
  };
  
  const handleCancel = () => {
    navigate("/contacts");
  };

  const isFormValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contact.email)) {
      alert("Please enter a valid email.");
      return false;
    }

    const cleanedPhone = contact.phone.replace(/\D/g, ''); 
    const phonePattern = /^\d{8,13}$/; 
    if (!phonePattern.test(cleanedPhone)) {
      alert(
        "Please enter a phone number using only digits, in the format CCACNumber (e.g., 551191234567)."
      );
      return false;
    }

    if (
      !contact.name ||
      !contact.address.street ||
      !contact.address.number ||
      !contact.address.city ||
      !contact.address.state ||
      !contact.address.country ||
      !contact.address.postalCode
    ) {
      alert("All fields are required.");
      return false;
    }

    return true;
  };

  return (
    <Container>
      <Header>
        <h1>{contact.id ? "Edit Contact" : "New Contact"}</h1>
      </Header>
      <Form>
        <FormField>
          <label>Name</label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </FormField>

        <FormField>
          <label>Street</label>
          <input
            type="text"
            value={contact.address.street}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, street: e.target.value },
              })
            }
            required
          />
        </FormField>

        <FormField>
          <label>Number</label>
          <input
            type="text"
            value={contact.address.number}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, number: e.target.value },
              })
            }
            required
          />
        </FormField>

        <FormField>
          <label>City</label>
          <input
            type="text"
            value={contact.address.city}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, city: e.target.value },
              })
            }
            required
            />
        </FormField>

        <FormField>
          <label>State</label>
          <input
            type="text"
            value={contact.address.state}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, state: e.target.value },
              })
            }
            required
          />
        </FormField>

        <FormField>
          <label>Country</label>
          <input
            type="text"
            value={contact.address.country}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, country: e.target.value },
              })
            }
            required
          />
        </FormField>

        <FormField>
          <label>Postal Code</label>
          <input
            type="text"
            value={contact.address.postalCode}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, postalCode: e.target.value },
              })
            }
            required
          />
        </FormField>

        <FormField>
          <label>Phone (CountryCode AreaCode PhoneNumber)</label>
          <input
            type="text"
            placeholder="CC AC Number"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
        </FormField>

        <FormField>
          <label>Email</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </FormField>

        <ButtonContainer>
          <Button type="button" onClick={handleCancel} secondary>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>Save</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default ContactEdit;
