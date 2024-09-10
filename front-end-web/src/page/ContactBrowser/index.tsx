import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contact_ms, request_header } from "../../services/HttpServer";
import { getAxiosErrorMessage } from "../../utils/ErrorUtil";
import { Button, Container, Header, LoadMoreButton, Table } from "./styles";

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Contact {
  id?: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
}

const ContactBrowser: React.FC = () => {

	const navigate = useNavigate();
    const [contacts, setContacts] = useState([] as Contact[]);

    const [page, setPage] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const limit = 5; 

    const fetchData = async () => {
        setLoading(true); 
        const response = await contact_ms.get("/find-all", {
            params: {
                page: page,
                limit: limit
            },
            headers: request_header()
        });

        setContacts((prevContacts) => [...prevContacts, ...response.data]);
        setLoading(false); 
        setHasLoaded(true);
    };

    const handleEdit = (contact: Contact) => {
        navigate("/edit", { state: { contactId: contact.id } });
    };

	const handleDelete = async (contact: Contact) => {

		const confirmed = window.confirm("Você tem certeza que deseja excluir este contato?");

		if(!confirmed) return;

		let response = null;

		try {

			response = await contact_ms.delete(`/delete/${contact.id}`, {
				headers: request_header()
			});

		} catch(error) {
			alert(getAxiosErrorMessage(error));
			return;
		}
	

		if (response && response.status === 200) {
			alert("Contact successfully deleted.");
			setContacts((prevContacts) =>
				prevContacts.filter((c) => c.id !== contact.id)
			);
		}
    };

    const handleNewContact = async () => {
        navigate("/new", { state: { contactId: null } });
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
        fetchData();
    };

    return (
        <Container>
          <Header>
            <h1>Contacts</h1>
            <Button onClick={handleNewContact}>Add</Button>
          </Header>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>E-mail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact?.id}>
                  <td>{contact?.name}</td>
                  <td>
                    {contact?.address.street}, {contact?.address.number}, {contact?.address.city}, {contact?.address.state}, {contact?.address?.country}, {contact?.address?.postalCode}
                  </td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>
                    <Button type="button" onClick={() => handleEdit(contact)}>Edit</Button>
                    <Button type="button" onClick={() => handleDelete(contact)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
              {loading ? "Loading..." : hasLoaded ? "Load More" : "Load"}
            </LoadMoreButton>
          </div>
        </Container>
    );
};

export default ContactBrowser;