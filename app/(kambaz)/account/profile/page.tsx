import Link from "next/link";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
export default function Profile() {
  return (
    <Form className="w-50" id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        placeholder="enter username..."
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        placeholder="enter password..."
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        placeholder="enter first name..."
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        placeholder="enter last name..."
        className="mb-2"
      />
      <FormControl id="wd-dob" type="date" className="mb-2" />
      <FormControl
        id="wd-email"
        placeholder="enter email..."
        type="email"
        className="mb-2"
      />
      <Button variant="danger w-100">Signout</Button>
    </Form>
  );
}
